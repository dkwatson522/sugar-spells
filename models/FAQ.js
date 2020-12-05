const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const slug = require('slugs');


const faqSchema = new Schema({
  question: {
    type:String,
    unique: true,
    lowercase: true,
    trim: true,
    required: 'Please provide a question!'
  },
  response: {
    type:String,
    unique: true,
    lowercase: true,
    trim: true,
    required: 'Please provide a response!'
  }
})

module.exports = mongoose.model("FAQ", faqSchema)
