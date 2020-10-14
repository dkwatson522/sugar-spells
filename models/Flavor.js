const mongoose = require("mongoose");

const flavorSchema = new mongoose.Schema({
  signature: {
    name: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: 'Please supply a flavor name'
    },
    description: {
      type: String,
      lowercase: true,
      trim: true,
      required: 'Please supply a description'
    }
  },
  buildYourOwn: {
    base: {
      ingredient: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: 'Please supply an ingredient'
      }
    },
    filling: {
      ingredient: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: 'Please supply an ingredient'
      }
    },
    topping: {
      ingredient: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: 'Please supply an ingredient'
      }
    }
  }
})

module.exports = mongoose.model("Flavor", flavorSchema)
