const loanModel = require('../models/loan');
const bookModel = require('../models/book');
const userModel = require('../models/user');
const { validationResult, matchedData } = require('express-validator');

const controller = {
  //
  create: async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(422).json({ message: 'Error', errors: result.array() });

    const data = matchedData(req)
    try {
      const book = await bookModel.findById(data.book);
      if (!book) return res.status(400).json({ message: 'Error', error: `No book with id: ${data.book} found` })
      if (book.availableQuantity === 0) return res.json({ 'message': 'This book is not available at the moment. It\'s out stock.' })

      const user = await userModel.findById(data.user);
      if (!user) return res.status(400).json({ message: 'Error', error: `No user with id: ${data.user} found` })

      const loan = await loanModel.create({
        book: data.book,
        user: data.user,
        loanDate: data.loan_date,
        plannedReturnDate: data.planned_return_date,
      })

      const updatedbook = await bookModel.findById(loan.book);
      await updatedbook.updateOne({ $inc: { availableQuantity: - 1 } })

      res.json({ message: 'Success', data: { 'loan': loan } });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'An error occured.' });
    }
  },
  // 
  getByUser: async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(422).json({ message: 'Error', errors: result.array() });

    const data = matchedData(req);
    try {
      const loans = await loanModel.find({ user: data.user });

      res.json({ message: 'Success', data: loans });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'An error occured.' });
    }
  },
  // 
  updateDateAndQty: async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(422).json({ message: 'Error', errors: result.array() });

    const data = matchedData(req);
    try {
      const loan = await loanModel.findById(data.loan_id);
      loan.updateOne({ $set: { effectiveReturnDate: data.effective_return_date } });

      if (!loan.effectiveReturnDate) {
        const book = await bookModel.findById(loan.book)
        await book.updateOne({ $inc: { availableQuantity: 1 } });
      }

      res.json({ message: 'Success', data: loan });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'An error occured.' });
    }
  },
  // 
  updateDateAndDelete: async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(422).json({ message: 'Error', errors: result.array() });

    const data = matchedData(req);
    try {
      const loan = await loanModel.findById(data.loan_id);
      if (!loan) return res.status(422).json({ message: 'No loan with this id found' })

      loan.updateOne({ $set: { effectiveReturnDate: data.effective_return_date } })
      await loan.deleteOne()

      res.json({ message: 'Success', data: loan });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'An error occured.' });
    }
  },
  // 
  countMonthly: async (req, res) => {
    try {
      const book = await loanModel.aggregate([
        {
          $group: { _id: "$loanDate", totalLoan: { $sum: 1 } },
        }
      ])
      res.json({ message: 'Success', data: book });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'An error occured.' });
    }
  },
}

module.exports = controller