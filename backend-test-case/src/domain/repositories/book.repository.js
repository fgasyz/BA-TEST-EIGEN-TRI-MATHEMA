const BookModel = require('../../infrastructure/book.model');

class BookRepository {
  constructor() {
    this.bookModel = new BookModel();
  }

  async getAllBookAndQuantity() {
    return await this.bookModel.getAllBookAndQuantity();
  }
}

module.exports = BookRepository;
