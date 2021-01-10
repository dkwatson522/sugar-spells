const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const slug = require('slugs');
const validator = require('validator');


const orderSchema = new Schema({
  email: {
    type: String,
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
  delivery: {
    type: {
      type: String,
      required: 'This field is required'
    },
    address: {
      type: String
    }
  },
  treat:[{
    name: {
      type: String,
      required: 'Please choose a treat!'
    },
    amount: {
      type: Number,
      required: 'Please provide a treat amount'
    },
    cakeTierAmount: Number,
    flavorType: {
      signature: String,
      buildYourOwn: {
        base: String,
        filling: String,
        topping: String
      }
    },
    frosting: String,
    flavor: String,
    flowerType: String
  }],

  photo: String,
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
