const mongoose = require('mongoose');

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required';

let ratingSchema = new mongoose.Schema({
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: REQUIRED_VALIDATION_MESSAGE },
    recipeId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Recipe', required: REQUIRED_VALIDATION_MESSAGE },
    dateOfAdded: { type: mongoose.SchemaTypes.Date, required: REQUIRED_VALIDATION_MESSAGE, default: Date.now },
    rating: { type: Number, required: REQUIRED_VALIDATION_MESSAGE }
});

let Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;