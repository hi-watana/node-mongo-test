var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

var model = require('../js/model');
var TodoItem = model.TodoItem;

/* GET detail of an item. */
router.get('/', (req, res, next) => {
    res.render('item', { title: 'Detail', appTitle: 'Todo App' });
});

router.post('/', (req, res, next) => {
    TodoItem.findById(req.body._id, (error, result) => {
        if (error) throw error;
        res.json(result);
    });
});

router.post('/update', (req, res, next) => {
    var body = req.body;
    TodoItem.update(
        {_id: body._id},
        {$set: {
            title: body.title,
            description: body.description,
            deadline: body.deadline
        }},
        (error) => {
            if (error) throw error;
            res.redirect('/');
        }
    );
});
    
router.post('/delete', (req, res, next) => {
    var body = req.body;
    TodoItem.findByIdAndRemove(body._id, (error) => {
        if (error) throw error;
        res.redirect('/');
    });
});

module.exports = router;
