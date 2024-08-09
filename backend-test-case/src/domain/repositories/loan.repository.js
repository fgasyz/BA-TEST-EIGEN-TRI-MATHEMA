const LoanModel = require('../../infrastructure/loan.model');
const BookModel = require('../../infrastructure/book.model');
const MemberModel = require('../../infrastructure/member.model');
const ClientError = require('../../exception/client.error');

class LoanRepository {
  constructor() {
    this.bookModel = new BookModel();
    this.memberModel = new MemberModel();
    this.loanModel = new LoanModel();
  }

  async createLoan(code_book, code_member, return_at) {
    const booksAreLoanByEachMember =
      await this.loanModel.getBooksAreLoanByEachMember(code_member);
    if (booksAreLoanByEachMember.length > 1) {
      throw new ClientError('can"t borrow more than 2 item', 400);
    } else {
      const isBookIsExistAndNotBorrow =
        await this.bookModel.checkBookIsExistAndNotBorrow(code_book);
      const isMemberExistAndNotPenalty =
        await this.memberModel.checkMemberIsExistAndNotPenalty(code_member);
      if (
        isBookIsExistAndNotBorrow != null &&
        isMemberExistAndNotPenalty != null
      ) {
        await this.bookModel.updateBookStatus(code_book, 'borrowed');
        return await this.loanModel.createLoan(
          code_book,
          code_member,
          return_at,
        );
      } else {
        throw new ClientError('can"t create new loan', 400);
      }
    }
  }

  async deleteLoan(code_book, code_member) {
    const isMemberExistAndNotPenalty =
      await this.loanModel.checkReturnBookIsLoanByCurrentMember(
        code_book,
        code_member,
      );
    if (isMemberExistAndNotPenalty != null) {
      const isMemberFinalty = this.memberModel.createMemberIsPenalty(
        isMemberExistAndNotPenalty,
      );
      const data = await this.memberModel.setMemberIsPinalty(
        isMemberExistAndNotPenalty.code_member,
        isMemberFinalty,
      );
      await this.bookModel.updateBookStatus(code_book, 'exist');
      return await this.loanModel.deleteLoan(code_book, code_member);
    } else {
      throw new ClientError('member and book not found');
    }
  }

  async getBooksAreLoanByEachMember(code_member) {
    const membercheck =
      await this.memberModel.checkMemberIsExistAndNotPenalty(code_member);
    if (membercheck != null) {
      return await this.loanModel.getBooksAreLoanByEachMember(code_member);
    } else {
      throw new ClientError('invalid code member');
    }
  }
}

module.exports = LoanRepository;
