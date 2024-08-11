const prismaClient = require('../config/database.config');

class LoanModel {
  async createLoan(code_book, code_member, return_at) {
    return await prismaClient.loan.create({
      data: {
        code_book: code_book,
        code_member: code_member,
        return_at: return_at,
      },
    });
  }

  async deleteLoan(code_book, code_member) {
    return await prismaClient.loan.delete({
      where: {
        code_book_code_member: {
          code_book: code_book,
          code_member: code_member,
        },
      },
    });
  }

  async getBooksAreLoanByEachMember(code_member) {
    const loan = await prismaClient.loan.findMany({
      where: {
        code_member: code_member,
      },
    });
    return loan;
  }

  async checkBookIsLoanByCurrentMember(code_book, code_member) {
    const data = await prismaClient.loan.findFirst({
      where: {
        code_member: code_member,
        code_book: code_book,
      },
    });
    return data;
  }
}

module.exports = LoanModel;
