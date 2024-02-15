const { StatusCodes } = require("http-status-codes");
const Books = require("../model/book");
const asyncHandler = require("express-async-handler");
const { NotFoundError } = require("../errors");

//get all books
const getAllBooks = asyncHandler(async (req, res) => {
  const book = await Books.find();
  res.status(StatusCodes.OK).json(book);
});

//add a book
const addBook = asyncHandler(async (req, res) => {
  console.log(req.files.img[0].path)
  const book = await Books.create({
    name: req.body.name,
    author:req.body.author,
    genre: req.body.genre,
    doc: req.files.pdf[0].path,
    img: req.files.pdf[0].path 
  });
  res.status(StatusCodes.CREATED).json(book);
});


//get one book
const getBook = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const book = await Books.findById(id);
  if (!book) {
    throw new NotFoundError("book does not exist in library");
  }
  res.status(StatusCodes.OK).json(book);
});

//update a book
const updateBook = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const book = await Books.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!book) {
    throw new NotFoundError("book does not exist in library");
  }
  res.status(StatusCodes.OK).json(book);
});


//delete a book
const deleteBook = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const book = await Books.findByIdAndDelete(id);
  if (!book) {
    throw new NotFoundError("book does not exist in library");
  }
  res.status(StatusCodes.OK).json(book);
});
module.exports = {
  addBook,
  getAllBooks,
  getBook,
  updateBook,
  deleteBook,
};
