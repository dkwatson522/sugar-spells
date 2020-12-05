const mongoose = require('mongoose');
const Flavor = mongoose.model('Flavor');
const Service = mongoose.model('Service');
const User = mongoose.model('User');
const FAQ = mongoose.model('FAQ');
const Contact = mongoose.model('Contact')
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');
const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('images/');
    if(isPhoto) {
      next(null, true);
    } else {
      next({ message: 'That filetype isn\'t allowed!' }, false);
    }
  }
};

// HOMPAGE
exports.homePage = (req, res) => {
  res.render('index', { title: 'Home'});
};

// FLAVORS
exports.getFlavors = async (req, res) => {
  const flavors = await Flavor.find()
  res.render('flavors', { title: 'Flavors', flavors })
};
exports.addFlavor = (req, res) => {
  res.render('addFlavors', { title: 'Add New Flavor'})
};
exports.createFlavor = async (req, res) => {
  // req.body.author = req.user._id;
  console.log(req.body)
  const store = await (new Flavor(req.body)).save();
  res.redirect('/flavors');
};

// SERVICES
exports.getServices = async (req, res) => {
  const services = await Service.find()
  res.render('services', { title: 'Services', services})
};
exports.addService = (req, res) => {
  res.render('addServices', {title: 'Add New Services'})
};
exports.createService = async (req, res) => {
  const service = await (new Service(req.body)).save();
  res.redirect('/services');
};

// FAQs
exports.getFaqs = async (req, res) => {
  const faqs = await FAQ.find()
  res.render('faqs', { title: 'FAQS', faqs})
};
exports.addFaq = (req, res) => {
  res.render('addFaqs', {title: 'Add New FAQ'})
};
exports.createFaq = async (req, res) => {
  const faq = await (new FAQ(req.body)).save();
  res.redirect('/faqs')
}

// CONTACTS
exports.contactPage = (req, res) => {
  res.render('contact', { title: 'Contact Us'})
};
exports.createMessage = async (req, res) => {
  const message = await (new Contact(req.body)).save();
  res.redirect('/');
};

// ABOUT
exports.aboutPage = (req, res) => {
  res.render('about', { title: 'About the Baker'})
};



exports.upload = multer(multerOptions).single('photo');

exports.resize = async (req, res, next) => {
  // check if there is no new file to resize
  if (!req.file) {
    next(); // skip to the next middleware
    return;
  }
  const extension = req.file.mimetype.split('/')[1];
  req.body.photo = `${uuid.v4()}.${extension}`;
  // now we resize
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(800, jimp.AUTO);
  await photo.write(`./public/uploads/${req.body.photo}`);
  // once we have written the photo to our filesystem, keep going!
  next();
};
