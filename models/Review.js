const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const slug = require('slugs');

const reviewSchema = new Schema({
  text:String,
  reviewer: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String,
    activeUser: Boolean
  },
  createdAt: {
    type:Date,
    default: Date.now
  }
})

module.exports = mongoose.model("Review", reviewSchema)
