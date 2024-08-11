const express = require('express');
const loanRouter = express.Router();
const LoanService = require('../domain/services/loan.service');

loanRouter.get('/member/:id', async (req, res, next) => {
  try {
    const loan = await LoanService.getBooksAreLoanByEachMember(req.params.id);
    res.json({
      code_member: req.params.id,
      member_loan_books: loan.length,
    });
  } catch (error) {
    next(error);
  }
});

loanRouter.post('/book/add', async (req, res, next) => {
  try {
    const { code_book, code_member, return_at } = req.body;
    await LoanService.createLoan(code_book, code_member, return_at);
    res.json({
      message: 'loan is created successfully',
    });
  } catch (error) {
    next(error);
  }
});

loanRouter.delete('/delete', async (req, res, next) => {
  try {
    const { code_book, code_member } = req.query;
    const data = await LoanService.deleteLoan(code_book, code_member);
    res.json({ message: 'loan is deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = loanRouter;
