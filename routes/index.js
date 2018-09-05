var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());

var mongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var assert = require('assert');
const MONGODB_URI = 'mongodb://localhost:27017';

mongoose.connect(MONGODB_URI);

// todos schema
var TodoItem = new Schema({
    isdone: Boolean,
    content: String
});

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Todo App' });
});

router.post('/', (req, res, next) => {

    console.log(req.body);
    var todoItem = new TodoItem(req.body);

    todoItem.save((error) => {
        if (error) throw error;
    })
    
    res.end(JSON.stringify(req.body));
});

module.exports = router;
