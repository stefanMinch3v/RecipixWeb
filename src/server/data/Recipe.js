const mongoose = require('mongoose');

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required';

let recipeSchema = new mongoose.Schema({
    title: { type: String, required: REQUIRED_VALIDATION_MESSAGE, unique: true },
    ingredients: [{ type: String, required: REQUIRED_VALIDATION_MESSAGE }],
    description: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
    dateOfAdded: { type: mongoose.SchemaTypes.Date, required: true, default: Date.now },
    imageUrl: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
    category: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
    cookingTime: { type: Number, required: REQUIRED_VALIDATION_MESSAGE },
    servings: { type: Number, required: REQUIRED_VALIDATION_MESSAGE },
    comments: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Comment' }],
    user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: REQUIRED_VALIDATION_MESSAGE }
});

let Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;