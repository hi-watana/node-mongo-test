var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// schema
var TodoItem = new Schema({
    isdone: Boolean,
    content: String
});


mongoose.connect('mongodb://localhost/sake');

// Compile models from schemas, export these models.
exports.TodoItem = mongoose.model('TodoItem', TodoItem);
