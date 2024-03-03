const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const author = new Schema({
  user: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  publishedBooks: {
    type: [ObjectId],
    ref: 'Book',
    required: true,
  },
});


module.exports = mongoose.model('Author', author)