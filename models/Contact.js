const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require('validator');

const contactSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please Supply an email address'
  },
  name: {
    type: String,
    required: 'Please supply a name',
    trim: true,
    lowercase: true
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
    type: Date,
    required: 'Please supply a delivery date!'
  }
})

module.exports = mongoose.model("Contact", contactSchema)
