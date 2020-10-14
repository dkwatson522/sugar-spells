const mongoose = require("mongoose");


const faqSchema = new mongoose.Schema({
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
