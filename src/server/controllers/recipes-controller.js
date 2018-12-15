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
                    return res.status(400).send({ error: constants.INVALID_USER_DATA });
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
                                        .catch(err => res.status(400).send({ error: err.message }));
                                }
                            });
                        }).catch(err => res.status(400).send({ error: err.message }));
                }).catch(err => res.status(400).send({ error: err.message }));

                return res.status(201).end();
            }).catch(err => {
                return res.status(400).send({ error: err.message });
            });
    },
    editGet: (req, res) => {
        // TODO
    },
    editPost: (req, res) => {
        // TODO
    },
    details: (req, res) => {
        const id = req.params.id || -1;

        Recipe
            .findOne(ObjectId(id))
            .then(recipe => {
                if (!recipe) {
                    return res.status(400).send({ error: constants.NOT_FOUND_RECIPE });
                }

                return res.status(200).send({ recipe });
            })
            .catch(err => res.status(400).send({ error: err.message }));
    },
    all: (req, res) => {
        // const search = req.query.search; TODO later
        const page = parseInt(req.query.page) || 1;

        const pageSize = 6;
        //let startIndex = (page - 1) * pageSize;
        //let endIndex = startIndex + pageSize;

        Recipe
            .find()
            .sort('dateOfAdded')
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .then(recipes => {
                if (!recipes) {
                    return res.status(400).send({ error: constants.EMPTY_RECIPES });    
                }

                return res.status(200).send(recipes);
            })
            .catch(err => res.status(400).send({ error: err.message }));
    },
    totalNumber: (req, res) => {
        Recipe
            .estimatedDocumentCount()
            .then(allRecipes => {
                return res.status(200).send(String(allRecipes));
            })
            .catch(err => res.status(400).send({ error: err.message }));
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