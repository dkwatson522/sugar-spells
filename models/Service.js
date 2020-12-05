const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const slug = require('slugs');

const serviceSchema = new Schema({
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


serviceSchema.pre('save', function(next) {
  if(!this.isModified('name')) {
    next(); // skip prehook save
    return; //stop function to save slug
  }
  this.slug = slug(this.name);
  next();
});

module.exports = mongoose.model("Service", serviceSchema);
