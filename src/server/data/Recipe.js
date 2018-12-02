const mongoose = require('mongoose');

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required';

let recipeSchema = new mongoose.Schema({
    title: { type: String, required: REQUIRED_VALIDATION_MESSAGE, unique: true, index: true },
    ingredients: { type: String, required: REQUIRED_VALIDATION_MESSAGE, index: true },
    description: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
    dateOfAdded: { type: mongoose.SchemaTypes.Date, required: true, default: Date.now },
    imagePath: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
    category: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
    comments: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Comment' }]
});

let Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;