const LoanModel = require('../../infrastructure/loan.model');
const BookModel = require('../../infrastructure/book.model');
const MemberModel = require('../../infrastructure/member.model');
const ClientError = require('../../exception/client.error');
const Loan = require('../entitas/loan.entity');

class LoanRepository {
  constructor() {
    this.bookModel = new BookModel();
    this.memberModel = new MemberModel();
    this.loanModel = new LoanModel();
  }

  async createLoan(code_book, code_member, return_at) {
    const now = new Date(Date.now()).getDate();
    const isMemberExist =
      await this.memberModel.checkMemberIsExist(code_member);

    const penaltyDays = isMemberExist.finalty_date
      ? new Date(isMemberExist.finalty_date).getDate()
      : null;

    if (now > penaltyDays && isMemberExist != null) {
      await this.memberModel.setMemberIsPinalty(code_member, false, null);
      const booksAreLoanByEachMember =
        await this.loanModel.getBooksAreLoanByEachMember(code_member);
      if (booksAreLoanByEachMember.length > 1) {
        throw new ClientError('can"t borrow more than 2 item', 400);
      } else {
        const isBookIsExistAndNotBorrow =
          await this.bookModel.checkBookIsExistAndNotBorrow(code_book);
        const isMemberExist =
          await this.memberModel.checkMemberIsExist(code_member);
        const isMemberNotPenalty =
          await this.memberModel.checkMemberIsNotPenalty(code_member);
        if (
          isBookIsExistAndNotBorrow != null &&
          isMemberExist != null &&
          isMemberNotPenalty != null
        ) {
          await this.bookModel.updateBookStatus(code_book, 'borrowed');
          const loan = new Loan(code_book, code_member, return_at);
          const { code_book, code_member, return_at } = loan;
          return await this.loanModel.createLoan(
            code_book,
            code_member,
            return_at,
          );
        } else {
          throw new ClientError('can"t create new loan', 400);
        }
      }
    } else {
      throw new ClientError('Member is being banned');
    }
  }

  async deleteLoan(code_book, code_member) {
    const isBookLoanByCurrentMember =
      await this.loanModel.checkBookIsLoanByCurrentMember(
        code_book,
        code_member,
      );
    if (isBookLoanByCurrentMember != null) {
      const memberFinalty = this.memberModel.checkMemberIsPenalty(
        isBookLoanByCurrentMember,
      );
      const penaltyDays = memberFinalty.penaltyDaysFinish
        ? new Date(memberFinalty.penaltyDaysFinish)
        : null;
      if (penaltyDays != null) {
        if (
          isBookLoanByCurrentMember.return_at.getDate() <= penaltyDays.getDate()
        ) {
          await this.memberModel.setMemberIsPinalty(
            code_member,
            true,
            penaltyDays,
          );
        }
      }
      await this.bookModel.updateBookStatus(code_book, 'exist');
      return await this.loanModel.deleteLoan(code_book, code_member);
    } else {
      throw new ClientError('member or book not found');
    }
  }

  async getBooksAreLoanByEachMember(code_member) {
    const membercheck = await this.memberModel.checkMemberIsExist(code_member);
    if (membercheck != null) {
      return await this.loanModel.getBooksAreLoanByEachMember(code_member);
    } else {
      throw new ClientError('invalid code member');
    }
  }
}

module.exports = LoanRepository;
