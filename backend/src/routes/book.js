const express = require('express')
const router = express.Router()
const userAuthHandler = require('../middleware/auth')
const { getBook, getAllBooks, addBook, updateBook, deleteBook } = require('../controllers/book')
const adminAuthHandler = require('../middleware/adminAuth')


router.get('/',  userAuthHandler, getAllBooks)
router.route('/:id').get(userAuthHandler, getBook).patch( adminAuthHandler, updateBook).delete( adminAuthHandler, deleteBook)
router.post('/', adminAuthHandler, addBook )

module.exports = router