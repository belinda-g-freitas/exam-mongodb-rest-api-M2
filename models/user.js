const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
  name: {
    type: String,
    require: true,
    minlength: 3,
    maxlength: 50,
  },
  nationality: {
    type: String,
    require: true,
  },
  birthday: {
    type: Date,
    require: true,
  },
})


module.exports = mongoose.model('User', user)