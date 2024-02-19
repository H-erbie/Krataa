const express = require('express')
const router = express.Router()
const {getAllBooks, addBook, getBook} = require('../controllers/book')


router.get('/',  getAllBooks)
router.get('/:id',  getBook)

router.post('/',  addBook)

module.exports = router
