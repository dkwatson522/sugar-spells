const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const slug = require('slugs');
const validator = require('validator');


const orderSchema = new Schema({
  email: {
    type: String,
    // unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'This field is required'
  },
  name: {
    first: {
      type: String,
      lowercase: true,
      trim: true
    },
    last: {
      type: String,
      lowercase: true,
      trim: true
    }
  },
  phoneNumber: {
    type: String,
    trim: true,
    min: 10
  },
  eventDate: {
    type: Date,
    trim: true,
    required: 'This field is required'
  },
  readyTime: {
    type: Date,
    trim: true,
    required: 'This field is required'
  },
  eventType: {
    type: String,
    trim: true,
    required: 'This field is required'
  },
  numberOfGuests: {
    type: Number,
    trim: true,
    required: 'This field is required'
  },
  deliveryType: {
    type: String,
    required: 'This field is required'
  },
  interests: {
    service: {
      type: String,
      required: 'This field is required'
    },
    cakeTiers: {
      type: Number
    },
    flowers: {
      type: String
    },
    quantity: {
      type: Number
    }
  },
  photo: String,
  addOn: [String],
  description: {
    type: String,
    trim: true,
    required: 'This field is required'
  },
  created: {
    type: Date,
    default: Date.now
  },

})

module.exports = mongoose.model("Order", orderSchema)
