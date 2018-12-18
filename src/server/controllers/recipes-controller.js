const Recipe = require('mongoose').model('Recipe');
const User = require('mongoose').model('User');
const Ingredient = require('mongoose').model('Ingredient');
const Rating = require('mongoose').model('Rating');
const ObjectId = require('mongoose').Types.ObjectId;
const constants = require('../utilities/constants');
const jwt = require('jsonwebtoken');

module.exports = {
    create: async (req, res) => {
        let reqRecipe = req.body;
        
        const recipeValidationInfo = validateRecipesData(reqRecipe);
        if (!recipeValidationInfo.success) {
            return res.status(400).send(recipeValidationInfo.errors);
        }

        const parsedIngredients = parseIngredientsData(reqRecipe.ingredients);
        if (!parsedIngredients.validData) {
            return res.status(400).send(parsedIngredients.errors);
        }

        try {
            const userId = getUserId(req.headers.authorization.split(" ")[1]);

            const user = await User.findOne(ObjectId(userId));
            if (!user) {
                return res.status(400).send({ error: constants.INVALID_USER_DATA });
            }

            await Recipe.create({
                title: reqRecipe.title,
                ingredients: parsedIngredients.parsedData,
                description: reqRecipe.description,
                imageUrl: reqRecipe.imageUrl,
                category: reqRecipe.category,
                cookingTime: reqRecipe.cookingTime,
                servings: reqRecipe.servings,
                user: userId
            });

            let ingredients = await Ingredient.find();
            let collectionNames = ingredients.map(el => el.name);
            parsedIngredients.parsedData.forEach(async element => {
                if (!collectionNames.includes(element)) {
                    await Ingredient.create({ name: element });
                }
            });
        } catch (err) {
            return res.status(400).send({ error: err.message });
        }
    },
    editGet: (req, res) => {
        // TODO
    },
    editPost: (req, res) => {
        // TODO
    },
    details: async (req, res) => {
        const id = req.params.id || -1;
        let userId;

        try {
            userId = getUserId(req.headers.authorization.split(" ")[1]);            
        } catch (error) {
            userId = -1;
        } finally {
            userId = ObjectId(userId);
        }

        try {
            let recipe = await Recipe
                .findOne(ObjectId(id))
                .populate('user')
                .populate('comment');
            if (!recipe) {
                return res.status(400).send({ error: constants.NOT_FOUND_RECIPE });
            }

            const ratingWithAlreadyVotedUser = await Rating.find({ userId: userId, recipeId: id });
            let currentUserRating = 0;

            if (ratingWithAlreadyVotedUser.length > 0) {
                currentUserRating = ratingWithAlreadyVotedUser.map(r => r.rating)[0];
            }

            let rating = await Rating.find({ recipeId: id });
            rating = rating.map(r => r.rating);
            const peopleRated = rating.length;

            let sum = ((rating.reduce((a, b) => a + b, 0) / peopleRated) * 10) * 2;
            if (!sum || Number.isNaN(sum)) {
                sum = 0;
            }

            recipe = recipe.toObject();
            recipe.ratings = sum;
            recipe.currentUserRating = currentUserRating;
            recipe.peopleRated = peopleRated;

            return res.status(200).send(recipe);
        } catch (err) {
            return res.status(400).send({ error: err.message });
        }
    },
    all: async (req, res) => {
        // const search = req.query.search; TODO later
        const page = parseInt(req.query.page) || 1;

        const pageSize = 6;
        //let startIndex = (page - 1) * pageSize;
        //let endIndex = startIndex + pageSize;
        try {
            const recipes = await Recipe
                .find()
                .sort('dateOfAdded')
                .skip((page - 1) * pageSize)
                .limit(pageSize);

            if (!recipes) {
                return res.status(400).send({ error: constants.EMPTY_RECIPES });    
            }

            return res.status(200).send(recipes);
        } catch (err) {
            res.status(400).send({ error: err.message });
        }
    },
    totalNumber: async (req, res) => {
        try {
            const allRecipes = await Recipe.estimatedDocumentCount();
            return res.status(200).send(String(allRecipes));
        } catch (err) {
            res.status(400).send({ error: err.message });
        }
    },
    addRating: async (req, res) => {
        const recipeId = ObjectId(req.params.id || -1);
        const userId = ObjectId(getUserId(req.headers.authorization.split(" ")[1]));
        const votedStars = req.body.stars;

        if (votedStars < 1 || votedStars > 5) {
            return res.status(400).send({ error: constants.INVALID_RATING });
        }

        try {
            const recipe = await Recipe.findOne(recipeId);
            if (!recipe) {
                return res.status(400).send({ error: constants.NOT_FOUND_RECIPE });    
            }
            
            const rating = await Rating.findOne({ recipeId: recipeId, userId: userId });
            if (rating) {
                return res.status(409).send({ error: constants.ALREADY_VOTED_RECIPE });
            }

            await Rating.create({
                recipeId: recipeId,
                userId: userId,
                rating: votedStars
            });

            return res.status(200).end();
        } catch (err) {
            return res.status(400).send({ error: err.message });
        }
    }
};

function validateRecipesData(recipe) { 
    const errors = {}; 
    let validData = true;

    if (!recipe.title || recipe.title.length < 3) {
        validData = false;
        errors.title = constants.INVALID_RECIPE_TITLE;
    }

    if (!recipe.description || recipe.description.length < 3) {
        validData = false;
        errors.description = constants.INVALID_RECIPE_DESCRIPTION;
    }

    if (!recipe.category || recipe.category.length < 3) {
        validData = false; 
        errors.category = constants.INVALID_RECIPE_CATEGORY;
    }

    if (!recipe.imageUrl || recipe.imageUrl.length < 10) {
        validData = false; 
        errors.imageUrl = constants.INVALID_RECIPE_IMAGEURL;
    }

    if (!recipe.cookingTime || recipe.cookingTime < 1) {
        validData = false; 
        errors.cookingTime = constants.INVALID_RECIPE_COOKINGTIME;
    }

    if (!recipe.servings || recipe.servings < 1) {
        validData = false; 
        errors.servings = constants.INVALID_RECIPE_SERVINGS;
    }

    return {
        success: validData,
        errors
    };
}

function parseIngredientsData(ingredients) {
    const errors = {}; 
    let validData = true;
    let result;

    if (!ingredients) {
        validData = false;
        errors.ingredients = constants.EMPTY_INGREDIENTS_COLLECTION;
    } else {
        result = ingredients
            .split(",")
            .map(el => el.trim());

        if (result.length == 0) {
            validData = false;
            errors.ingredients = constants.EMPTY_INGREDIENTS_COLLECTION;
        }
    }
    
    return {
        parsedData: result,
        validData,
        errors
    };
}

function getUserId(token) {
    return jwt.verify(token, constants.PRIVATE_KEY).sub;
}