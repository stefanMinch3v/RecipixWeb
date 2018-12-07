const mongoose = require('mongoose');

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required';

let ingredientSchema = new mongoose.Schema({
    name: { type: String, required: REQUIRED_VALIDATION_MESSAGE, index: true },
    dateOfAdded: { type: mongoose.SchemaTypes.Date, required: REQUIRED_VALIDATION_MESSAGE, default: Date.now },
});

let Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;