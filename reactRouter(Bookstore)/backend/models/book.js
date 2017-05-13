const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    id: {
        type: Number,
        required: [true, 'Book need an ID']
    },
    title: {
            type: String,
            required: [true, 'Book need a title']
    },
    info: String,
    moreInfo: String
});

const Book = mongoose.model('book', BookSchema);
module.exports = Book;