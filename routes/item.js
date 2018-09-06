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
    TodoItem.update(
        {_id: req.body._id},
        {$set: {title: req.body.title, description: req.body.description}},
        (error) => {
            if (error) throw error;
            res.redirect('/');
        }
    );
    
});

module.exports = router;
