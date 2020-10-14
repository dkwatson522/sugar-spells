const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
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
