const BookRepository = require('../repositories/book.repository');

class BookService {
  constructor() {
    this.bookRepository = new BookRepository();
  }
  async getAllBookAndQuantity() {
    const books = await this.bookRepository.getAllBookAndQuantity();
    return books;
  }
}

module.exports = new BookService();
