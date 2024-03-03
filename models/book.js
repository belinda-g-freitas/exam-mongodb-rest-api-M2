const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const book = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  description: {
    type: String,
    required: true,
    minlength: 3,
  },
  authors: {
    type: [ObjectId],
    ref: 'Author',
    required: true,
    minlength: 1,
  },
  genres: {
    type: Array,
    required: true,
    minlength: 1,
  },
  publishYear: {
    type: Number,
    required: true,
  },
  availableQuantity: {
    type: Number,
    required: true,
  },
});


module.exports = mongoose.model('Book', book)