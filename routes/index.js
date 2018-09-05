var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());

var mongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');

var assert = require('assert');
const MONGODB_URI = 'mongodb://localhost:27017';

mongoose.connect(MONGODB_URI);
var model = require('../js/model');
var TodoItem = model.TodoItem;

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', {title: 'Todo App'});
});

router.get('/todos', (req, res, next) => {
    console.log('/todos');
    
    TodoItem.find((error, result) => {
        if (error) throw error;
        res.json({todos: result});
    });
});

router.post('/todos', (req, res, next) => {

    console.log(req.body);
    var todoItem = new TodoItem(req.body);

    todoItem.save((error) => {
        if (error) throw error;
    })
    
    res.end(JSON.stringify(req.body));
});

module.exports = router;
