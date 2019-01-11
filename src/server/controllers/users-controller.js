const encryption = require('../utilities/encryption');
const User = require('mongoose').model('User');
const Recipe = require('mongoose').model('Recipe');
const Rating = require('mongoose').model('Rating');
const Comment = require('mongoose').model('Comment');
const constants = require('../utilities/constants');
const jwt = require('jsonwebtoken');
const ObjectId = require('mongoose').Types.ObjectId;
const sanitize = require('mongo-sanitize');

// Jwt from - https://blog.angular-university.io/angular-jwt-authentication/

module.exports = {
    registerPost: (req, res) => {
        let reqUser = req.body;
        const userValidationInfo = validateUserRegisterData(reqUser);

        if (!userValidationInfo.success) {
            return res.status(400).send(userValidationInfo.errors);
        }

        let salt = encryption.generateSalt();
        let hashedPassword = encryption.generateHashedPassword(salt, reqUser.password);

        User.create({
            username: reqUser.username,
            firstName: reqUser.firstName,
            lastName: reqUser.lastName,
            email: reqUser.email,
            salt: salt,
            hashedPass: hashedPassword
        }).then(user => {
            req.logIn(user, (err, success) => {
                if (err) {
                    return res.status(400).send({error: err.message});
                }

                return res.status(200).end();
            });
        }).catch(err => {
            if (err.message.includes(constants.DUPLICATE_KEY_DB)) {
                return res.status(400).send({error: constants.DUPLICATE_USERNAME_OR_EMAIL});
            }

            return res.status(400).send({error: err.message});
        });
    },
    loginPost: (req, res) => {
        let reqUser = req.body;
        const userValidationInfo = validateUserLoginData(reqUser);

        if (!userValidationInfo.success) {
            return res.status(400).send(userValidationInfo.errors);
        }

        User
            .findOne({ username: sanitize(reqUser.username) })
            .then(user => {
                if (!user) {
                    return res.status(400).send({error: constants.INVALID_USER_DATA});
                }

                if (!user.authenticate(sanitize(reqUser.password))) {
                    return res.status(400).send({error: constants.INVALID_USER_DATA});
                }

                req.logIn(user, (err, success) => {
                    if (err) {
                        return res.status(500).send({error: err.message});
                    }

                    const expirationOneHour = getUTCDateOneHourExpirationTime();

                    // generate token
                    const jwtBearerToken = jwt.sign({}, constants.PRIVATE_KEY, {
                        algorithm: 'HS256',
                        expiresIn: expirationOneHour,
                        subject: String(user._id),
                    });
                    
                    // if decide to use cookies
                    // secure true - means sends data back only if its https connection !
                    // httpOnly true - means that cookie wont be accessible from javascript code at all !
                    // res.cookie('SESSIONID', jwtBearerToken, {httpOnly: false, secure: false});

                    // send the JWT back to the user within the http response 
                    return res.status(200).send({
                        token: jwtBearerToken,
                        expiration: expirationOneHour,
                        roles: user.roles 
                    });
                });
            })
            .catch(err => {
                return res.status(400).send({error: err.message});
            });
    },
    // logout: (req, res) => {
    //     req.logout();
    //     return res.status(205).end();
    // }
    profile: async (req, res) =>{
        const userId = ObjectId(getUserId(req.headers.authorization.split(" ")[1]));

        try {
            const user = await User.findOne(userId);
            if (!user) {
                return res.status(400).send({ error: constants.EMPTY_USER });
            }

            let recipes = await Recipe.find({ user: userId });
            recipes = filterRecipesModel(recipes);

            let comments = await Recipe
                .find()
                .populate({ path: 'comments', match: { user: userId }});
            comments = filterCommentsModel(comments);

            let ratings = await Rating.find({ userId: userId });
            ratings = filterRatingModel(ratings);

            const userWithData = { user, recipes, comments, ratings };
            return res.status(200).send(userWithData);
        } catch (err) {
            return res.status(400).send({ error: err.message });
        }
    }
};

function filterCommentsModel(recipeWithComments) {
    recipeWithComments = recipeWithComments.filter(r => r.comments.length > 0);

    return recipeWithComments.map(r => {
        return {
            recipeId: r._id,
            comments: r.comments.map(c => c.content)
        };
    });
}

function filterRatingModel(rating) {
    return rating.map(el => {
        return { 
            recipeId: el.recipeId,
            rating: el.rating
        };
    });
}

function filterRecipesModel(recipes) {
    return recipes.map(el => {
        return { 
            _id: el._id,
            title: el.title,
            imageUrl: el.imageUrl
        };
    });
}

function validateUserLoginData(user) { 
    const errors = {}; 
    let validData = true;

    if (!user.username || user.username.length < 5) {
        errors.username = constants.INVALID_USERNAME_LENGTH;
        validData = false;
    }

    if (!user.password || user.password.length < 5) {
        errors.password = constants.INVALID_PASSWORD_LENGTH;
        validData = false;
    }

    return {
        success: validData,
        errors
    };
}

function validateUserRegisterData(user) {
    const errors = {}; 
    let validData = true;

    if (!user.username || user.username.length < 5) {
        errors.username = constants.INVALID_USERNAME_LENGTH;
        validData = false;
    }

    if (!user.password || user.password.length < 5) {
        errors.password = constants.INVALID_PASSWORD_LENGTH;
        validData = false;
    }

    if (!user.firstName || user.firstName.length < 2) {
        errors.firstName = constants.INVALID_FIRSTNAME_LENGTH;
        validData = false;
    }

    if (!user.lastName || user.lastName.length < 2) {
        errors.lastName = constants.INVALID_LASTNAME_LENGTH;
        validData = false;
    }

    if (user.password !== user.passwordConfirmation) {
        errors.passwordConfirmation = constants.INVALID_PASSWORD_RESEMBLANCE;
        validData = false;
    }

    const emailPattern = /\S+@\S+\.\S+/;
    const isValidEmail = emailPattern.test(user.email);
    if (!user.email || !isValidEmail) {
        errors.email = constants.INVALID_EMAIL_ADDRESS;
        validData = false;
    }

    return {
        success: validData,
        errors
    };
}

function getUTCDateOneHourExpirationTime() {  
    // const expirationOneHourInMls = new Date(new Date().getTime() + 2 * 60000).getTime();
    const date = new Date();
    date.setUTCMinutes(date.getUTCMinutes() + 60);

    return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
}

function getUserId(token) {
    return jwt.verify(token, constants.PRIVATE_KEY).sub;
}