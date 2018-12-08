const Recipe = require('mongoose').model('Recipe');
const User = require('mongoose').model('User');
const Ingredient = require('mongoose').model('Ingredient');
const ObjectId = require('mongoose').Types.ObjectId;
const constants = require('../utilities/constants');
const jwt = require('jsonwebtoken');

module.exports = {
    create: (req, res) => {
        let reqRecipe = req.body;
        
        const recipeValidationInfo = validateRecipesData(reqRecipe);
        if (!recipeValidationInfo.success) {
            return res.status(400).send(recipeValidationInfo.errors);
        }

        const parsedIngredients = parseIngredientsData(reqRecipe.ingredients);
        if (!parsedIngredients.validData) {
            return res.status(400).send(parsedIngredients.errors);
        }

        const userId = getUserId(req.headers.authorization.split(" ")[1]);

        User
            .findOne(ObjectId(userId))
            .then(user => {
                if (!user) {
                    return res.status(400).send({error: constants.INVALID_USER_DATA});
                }

                const userId = user._id;
                
                Recipe.create({
                    title: reqRecipe.title,
                    ingredients: parsedIngredients.parsedData,
                    description: reqRecipe.description,
                    imageUrl: reqRecipe.imageUrl,
                    category: reqRecipe.category,
                    cookingTime: reqRecipe.cookingTime,
                    servings: reqRecipe.servings,
                    user: userId
                }).then(() => {
                    Ingredient.find()
                        .then(ingredients => {
                            let collectionNames = ingredients.map(el => el.name);

                            parsedIngredients.parsedData.forEach(element => {
                                if (!collectionNames.includes(element)) {
                                    Ingredient.create({ name: element })
                                        .catch(err => res.status(400).send({error: err.message}));
                                }
                            });
                        }).catch(err => res.status(400).send({error: err.message}));
                }).catch(err => res.status(400).send({error: err.message}));

                return res.status(201).end();
            }).catch(err => {
                return res.status(400).send({error: err.message});
            });
    },
    editGet: (req, res) => {
        // TODO
    },
    editPost: (req, res) => {
        // TODO
    },
    details: (req, res) => {
        // TODO
    },
    all: (req, res) => {
        // TODO
    },
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
        result = ingredients.split(/[\s,]+/);

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