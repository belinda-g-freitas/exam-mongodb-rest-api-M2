const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const loan = new Schema({
  book: {
    type: ObjectId,
    ref: 'Book',
    required: true,
  },
  user: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  loanDate: {
    type: Date,
    required: true,
  },
  plannedReturnDate: {
    type: Date,
    required: true,
  },
  effectiveReturnDate: {
    type: Date,
  },
});

module.exports = mongoose.model('Loan', loan)