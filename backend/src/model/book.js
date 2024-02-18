const mongoose = require('mongoose')
const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide book name'],
        unique: [true, `This book is already in the library!`],
    },
    author: {
        type: String,
        required: [true, 'please provide book author']
    },
    img: {
        type: String,
        required: [true, 'please provide book image']
    },
    doc: {
        type: String,
        required: [true, 'please provide book document']
    },
    genre: {
        type: String,
        enum: ['romance', 'past questions', 'fantasy', 'action-adventure', 'aventure', 'action', 'fiction', 'sci-fi', 'history'],
        required: [true, 'please choose a book genre']
    },
    
}, {timestamps: true})

module.exports = mongoose.model('Books', bookSchema)

