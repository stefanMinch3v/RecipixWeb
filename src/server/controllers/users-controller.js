const encryption = require('../utilities/encryption');
const User = require('mongoose').model('User');
const constants = require('../utilities/constants');
const jwt = require('jsonwebtoken');

// Jwt from - https://blog.angular-university.io/angular-jwt-authentication/

module.exports = {
    registerPost: (req, res) => {
        let reqUser = req.body;

        if (!validateUserData(reqUser)) {
            return res.status(400).send({error: constants.INVALID_USER_LENGTH});
        }

        let salt = encryption.generateSalt();
        let hashedPassword = encryption.generateHashedPassword(salt, reqUser.password);

        User.create({
            username: reqUser.username,
            firstName: reqUser.firstName,
            lastName: reqUser.lastName,
            salt: salt,
            hashedPass: hashedPassword
        }).then(user => {
            req.logIn(user, (err, success) => {
                if (err) {
                    return res.status(400).send({error: err.message});
                }

                return res.status(200);
            });
        });
    },
    loginPost: (req, res) => {
        let reqUser = req.body;

        if (!validateUserData(reqUser)) {
            return res.status(400).send({error: constants.INVALID_USER_DATA});
        }

        User
            .findOne({ username: reqUser.username }).then(user => {
                if (!user) {
                    return res.status(400).send({error: constants.INVALID_USER_DATA});
                }

                if (!user.authenticate(reqUser.password)) {
                    return res.status(400).send({error: constants.INVALID_USER_DATA});
                }

                req.logIn(user, (err, success) => {
                    if (err) {
                        return res.status(500).send({error: err.message});
                    }

                    const expirationOneHour = Math.floor(Date.now() / 1000) + (60 * 60);
                    
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
            });
    },
    // logout: (req, res) => {
    //     req.logout();
    //     return res.status(205);
    // }
};

function validateUserData(user) {
    if (!user.username 
        || !user.password 
        || user.username.length < 5
        || user.password.length < 5) {
        return false;
    }

    return true;
}