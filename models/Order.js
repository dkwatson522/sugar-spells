const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const slug = require('slugs');
const validator = require('validator');
const { v4: uuidv4 } = require('uuid');


const orderSchema = new Schema({
  orderID: {
    type: String,
    default: Date.now
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please include your email address'
  },
  name: {
      type: String,
      trim: true
  },
  phoneNumber: {
    type: String,
    trim: true,
    min: 10
  },
  eventDate: {
    type: Date,
    trim: true,
    required: 'Please provide an event date'
  },
  readyTime: String,
  eventType: {
    type: String,
    trim: true
  },
  numberOfGuests: {
    type: Number,
    trim: true,
    required: 'Please provide the number of guests expected'
  },
  delivery: {
    preference: {
      type: String,
      required: 'Please provide a delivery preference'
    },
    address: {
      type: String
    }
  },
  cakeTierAmount: Number,
  flowerType: String,
  cakeTierOne: {
    flavor: {
      signature: String,
      buildYourOwn: {
        base: String,
        filling: String,
        topping: [String]
      }
    }
  },
  cakeTierTwo: {
    flavor: {
      signature: String,
      buildYourOwn: {
        base: String,
        filling: String,
        topping: [String]
      }
    }
  },
  cakeTierThree: {
    flavor: {
      signature: String,
      buildYourOwn: {
        base: String,
        filling: String,
        topping: [String]
      }
    }
  },
  sugarCookies: {
    name: String,
    amount: Number,
    flavor: [String]
  },
  cupcakes: {
    name: String,
    amount: Number,
    flavor: String,
    frosting: String
  },
  riceKrispiePops: {
    name: String,
    amount: Number
  },
  chocolateDippedStrawberries: {
    name: String,
    amount: Number
  },
  cakePops: {
    name: String,
    amount: Number
  },
  images: [{
    url: String,
    filename: String
  }],
  description: {
    type: String,
    trim: true,
    required: 'Please provide a brief description of the order'
  },
  created: {
    type: Date,
    default: Date.now
  }
},{ minimize: false })

module.exports = mongoose.model("Order", orderSchema)
