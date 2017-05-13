const router = require('express').Router();
let Book = require('../models/book');

//test
router.get('/', (req, res) => {
    res.json('hej');
});

//get all books
router.get('/books', (req, res) => {
    Book.find({}).then( (books) => {
        res.json(books);
    })
});

//get one book
router.get('/book/:id', (req, res) => {
    Book.findOne({id: req.params.id})
        .then((book) => {
            res.json(book);
        });
})

//add book
router.post('/book', (req, res, next) =>{
    Book.create(req.body).then((book) => {
    res.json(book);
    }).catch(next);
});

//update book
router.put('/book/:id', function(req, res, next){
    Book.findOneAndUpdate({id: req.params.id}, req.body)
    .then(function(){
        Book.findOne({ id: req.params.id})
        .then(function(book){
            res.send(book);
        });
    }).catch(next);
});

//delete book
router.delete('/book/:id', (req, res, next) => {
    Book.findOneAndRemove({id: req.params.id})
        .then((book) => {
          res.json(book);  
        }).catch(next);
});

module.exports = router;

