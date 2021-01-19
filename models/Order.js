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
    required: 'Please include your email address'
  },
  name: {
      type: String,
      lowercase: true,
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
  cake: {
    name: {
      type:String,
      default: "cake"
    },
    flavor: {
      signature: [String],
      buildYourOwn: {
        base: [String],
        filling: [String],
        topping: [String]
      }
    }
  },
  sugarCookies: {
    name: {
      type: [String],
      default: "sugar cookies"
    },
    amount: Number,
    flavor: String
  },
  cupcakes: {
    name: {
      type: String,
      default: "cupcakes"
    },
    amount: Number,
    flavor: String,
    frosting: String
  },
  riceKrispiePops: {
    name: {
      type: String,
      default: "rice krispie pops"
    },
    amount: Number
  },
  chocolateDippedStrawberries: {
    name: {
      type: String,
      default: "chocolate dipped strawberries"
    },
    amount: Number
  },
  cakepops: {
    name: {
      type: String,
      default: "cake pops"
    },
    amount: Number
  },
  images: [
    {
      url: String,
      fileName: String
    }
  ],
  description: {
    type: String,
    trim: true,
    required: 'Please provide a brief description of the order'
  },
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("Order", orderSchema)
