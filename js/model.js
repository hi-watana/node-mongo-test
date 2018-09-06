var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// schema
var TodoItem = new Schema({
    isdone: Boolean,
    content: String
});

const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI);

// Compile models from schemas, export these models.
exports.TodoItem = mongoose.model('TodoItem', TodoItem);
