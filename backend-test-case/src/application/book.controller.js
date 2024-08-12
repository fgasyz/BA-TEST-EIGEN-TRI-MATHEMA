const express = require('express');
const booksRouter = express.Router();
const BookService = require('../domain/services/book.service');

/**
 * @openapi
 * /api/books:
 *   get:
 *     summary: Shows all existing books and quantities
 *     responses:
 *       200:
 *         description: Shows all existing books and quantities
 */
booksRouter.get('/', async (req, res, next) => {
  try {
    const books = await BookService.getAllBookAndQuantity();
    res.json({ data: books });
  } catch (error) {
    next(error);
  }
});

module.exports = booksRouter;
