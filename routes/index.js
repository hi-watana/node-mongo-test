var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());

var model = require('../js/model');
var TodoItem = model.TodoItem;

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', {title: 'Todo App'});
});

router.post('/todos', (req, res, next) => {
    console.log('/todos');

    TodoItem.find((error, result) => {
        if (error) throw error;
        res.json({todos: result});
    });
});

router.post('/save', (req, res, next) => {

    console.log(req.body);
    var todoItem = new TodoItem(req.body);

    todoItem.save((error, data) => {
        if (error) throw error;
        res.json(data);
    });
});

router.post('/check', (req, res, next) => {
    console.log(req.body.isdone);
    TodoItem.update(
        {_id: req.body._id},
        {$set: {isdone: req.body.isdone}},
        (error) => {
            if (error) throw error;
        }
    )
    res.json({});
});

module.exports = router;
