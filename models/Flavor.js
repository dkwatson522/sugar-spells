const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const slug = require('slugs');

const flavorSchema = new Schema({
  signature: {
    name: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true
    },
    description: {
      type: String,
      lowercase: true,
      trim: true
    }
  },
  buildYourOwn: {
    base: {
      ingredient: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
      }
    },
    filling: {
      ingredient: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
      }
    },
    topping: {
      ingredient: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
      }
    }
  }
})

module.exports = mongoose.model("Flavor", flavorSchema)
