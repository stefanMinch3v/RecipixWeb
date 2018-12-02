const mongoose = require('mongoose');

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required';

let commentSchema = new mongoose.Schema({
    user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: REQUIRED_VALIDATION_MESSAGE },
    recipe: { type: mongoose.SchemaTypes.ObjectId, ref: 'Recipe', required: REQUIRED_VALIDATION_MESSAGE },
    dateOfAdded: { type: mongoose.SchemaTypes.Date, required: REQUIRED_VALIDATION_MESSAGE, default: Date.now },
    content: { type: String, required: REQUIRED_VALIDATION_MESSAGE }
});

let Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;