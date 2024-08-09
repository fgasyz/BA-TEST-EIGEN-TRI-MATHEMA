const LoanRepository = require('../repositories/loan.repository');
const BookRepository = require('../repositories/book.repository');
const MemberRepository = require('../repositories/member.repository');
const BookEntity = require('../entitas/book.entity');
const MemberEntity = require('../entitas/book.entity');
const LoanEntity = require('../entitas/loan.entity');

class LoanService {
  constructor() {
    this.bookRepository = new BookRepository();
    this.memberRepository = new MemberRepository();
    this.loanRepository = new LoanRepository();
  }

  async createLoan(code_book, code_member, return_at) {
    const formatDate = new Date(return_at);
    return await this.loanRepository.createLoan(
      code_book,
      code_member,
      formatDate,
    );
  }

  async deleteLoan(code_book, code_member) {
    return await this.loanRepository.deleteLoan(code_book, code_member);
  }

  async getBooksAreLoanByEachMember(code_member) {
    return await this.loanRepository.getBooksAreLoanByEachMember(code_member);
  }
}

module.exports = new LoanService();
