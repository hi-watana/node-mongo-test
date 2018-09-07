var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// schema
var TodoItem = new Schema({
    isdone: {type: Boolean, default: false},
    title: String,
    description: String,
    deadline: {type: Date, default: Date.now}
});

const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI);

// Compile models from schemas, export these models.
exports.TodoItem = mongoose.model('TodoItem', TodoItem);
