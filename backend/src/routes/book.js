const express = require('express')
const router = express.Router()
const userAuthHandler = require('../middleware/auth')
const { getBook, getAllBooks, addBook, updateBook, deleteBook } = require('../controllers/book')
const adminAuthHandler = require('../middleware/adminAuth')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads');
    },
    filename:function(req, file, cb){
        cb(null, file.originalname);
    }
})

new Date().toISOString();

// const fileFiler = (req, file, cb) => {
//   if (file.mimetype === "image/jpg" || file.mimetype === "image/png" ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };
const upload = multer({storage});

router.get('/',  getAllBooks)
router.route('/:id').get(userAuthHandler, getBook).patch( adminAuthHandler, updateBook).delete( adminAuthHandler, deleteBook)
router.post('/', upload.fields([{
  name: 'img', maxCount: 1
}, {
  name: 'pdf', maxCount: 1
}]), addBook )

module.exports = router