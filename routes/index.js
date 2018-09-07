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
    TodoItem.find({}).sort({ isdone: 0}).exec((error, result) => {
        if (error) throw error;
        res.json({todos: result});
    });
});

router.post('/save', (req, res, next) => {
    new TodoItem(req.body).save((error, data) => {
        if (error) throw error;
        res.json(data);
    });
});

router.post('/check', (req, res, next) => {
    TodoItem.update(
        {_id: req.body._id},
        {$set: {isdone: req.body.isdone}},
        (error) => {
            if (error) throw error;
        }
    );
    res.json({_id: req.body._id, isdone: req.body.isdone});
});

module.exports = router;
