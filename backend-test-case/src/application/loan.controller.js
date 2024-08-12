const express = require('express');
const loanRouter = express.Router();
const LoanService = require('../domain/services/loan.service');

/**
 * @openapi
 * /api/loan/member/{code_member}:
 *   get:
 *     summary: Shows the number of books being borrowed by each member
 *     parameters:
 *       - name: code_member
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *         description: code of member.
 *     responses:
 *       200:
 *         description: The number of books being borrowed by each member.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code_member:
 *                   type: string
 *                 member_loan_books:
 *                   type: string
 */
loanRouter.get('/member/:code_member', async (req, res, next) => {
  try {
    const loan = await LoanService.getBooksAreLoanByEachMember(
      req.params.code_member,
    );
    res.json({
      code_member: req.params.code_member,
      member_loan_books: loan.length,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 * /api/loan/book/add:
 *   post:
 *     summary: Members can borrow books with conditionss
 *     description: Members may not borrow more than 2 books, Borrowed books are not borrowed by other members, Member is currently not being penalized.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code_book:
 *                 type: string
 *                 description: Code of book.
 *                 example: SHR-1
 *               code_member:
 *                 type: string
 *                 description: Code of member.
 *                 example: M001
 *               return_at:
 *                 type: string
 *                 format: date
 *                 description: Date of return book.
 *                 example: "2024-08-15 21:32:25.123"
 *             required:
 *               - code_book
 *               - code_member
 *               - return_at
 *     responses:
 *       201:
 *         description: Loan is created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
loanRouter.post('/book/add', async (req, res, next) => {
  try {
    const { code_book, code_member, return_at } = req.body;
    await LoanService.createLoan(code_book, code_member, return_at);
    res.status(201).json({
      message: 'loan is created successfully',
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 * /api/loan/book/delete:
 *   delete:
 *     summary: Member returns the book with conditions
 *     description: The returned book is a book that the member has borrowed, If the book is returned after more than 7 days, the member will be subject to a penalty. Member with penalty cannot able to borrow the book for 3 days.
 *     parameters:
 *       - in: query
 *         name: code_book
 *         schema:
 *           type: string
 *         required: true
 *         description: code of book.
 *       - in: query
 *         name: code_member
 *         schema:
 *           type: string
 *         required: true
 *         description: code of member.
 *     responses:
 *       200:
 *         description: Loan is deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
loanRouter.delete('/book/delete', async (req, res, next) => {
  try {
    const { code_book, code_member } = req.query;
    const data = await LoanService.deleteLoan(code_book, code_member);
    res.json({ message: 'loan is deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = loanRouter;
