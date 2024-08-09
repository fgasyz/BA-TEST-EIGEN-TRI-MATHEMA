const prismaClient = require('../config/database.config');

class BookModel {
  async getAllBookAndQuantity() {
    const books = await prismaClient.book.findMany({
      where: {
        stock: 1,
        status: 'exist',
      },
    });
    return { books, qty: books.length };
  }

  async checkBookIsExistAndNotBorrow(code) {
    const book = await prismaClient.book.findUnique({
      where: { code: code, status: 'exist', stock: 1 },
    });
    return book;
  }

  async updateBookStatus(code, status) {
    const stock = status === 'exist' ? 1 : 0;
    await prismaClient.book.update({
      where: {
        code: code,
      },
      data: { status: status, stock: stock },
    });
  }
}

module.exports = BookModel;
