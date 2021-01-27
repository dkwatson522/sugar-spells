const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const slug = require('slugs');
const validator = require('validator');

const contactSchema = new Schema({
  email: {
    type: String,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please supply an email address'
  },
  name: {
    type: String,
    trim: true,
  },
  subject: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    trim: true
  },
  interests: [String],
  created: {
    type: Date,
    default: Date.now
  },
  deliveryDate: {
    type: Date
  }
})

module.exports = mongoose.model("Contact", contactSchema)
