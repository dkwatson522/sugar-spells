const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  item: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: 'Please supply an item name'
  },
  price: {
    type: String,
    lowercase: true,
    trim: true,
    required: 'Please supply a price'
  },
  image: String
})

module.exports = mongoose.model("Service", serviceSchema);
