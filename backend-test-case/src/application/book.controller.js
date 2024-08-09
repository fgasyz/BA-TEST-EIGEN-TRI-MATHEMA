const express = require('express');
const booksRouter = express.Router();
const BookService = require('../domain/services/book.service');

booksRouter.get('/', async (req, res, next) => {
  try {
    const books = await BookService.getAllBookAndQuantity();
    res.json({ data: books });
  } catch (error) {
    next(error);
  }
});

module.exports = booksRouter;
