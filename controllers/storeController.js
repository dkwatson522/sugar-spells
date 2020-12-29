const mongoose = require('mongoose');
const Flavor = mongoose.model('Flavor');
const Service = mongoose.model('Service');
const User = mongoose.model('User');
const FAQ = mongoose.model('FAQ');
const Contact = mongoose.model('Contact')
const Order = mongoose.model('Order')
const mail = require('../handlers/mail');
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
  req.flash('success', 'welcome home')
  // console.log(req.flash())
  res.render('index', { title: 'Home' });
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
  const flavor = await (new Flavor(req.body)).save();
  req.flash('success', `Successfully created new flavor!`)
  res.redirect('/flavors');
};
exports.showFlavor = async (req, res) => {
  const { id } = req.params;
  const flavor = await Flavor.findById(id);
  res.render('editFlavor', {title: 'Edit Flavor', flavor})
}
exports.updateFlavor = async (req,res) => {
  const { id } = req.params;
  const flavor = await Flavor.findByIdAndUpdate(id, { ...req.body }, { new: true } );
  res.redirect('/flavors');
}
exports.deleteFlavor = async (req, res) => {
  const { id } = req.params;
  const flavor = await Flavor.findByIdAndDelete(id);
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
exports.showService = async (req, res) => {
  const { id } = req.params;
  const service = await Service.findById(id);
  res.render('editService', {title: 'Edit Service', service})
}
exports.updateService = async (req,res) => {
  const { id } = req.params;
  const service = await Service.findByIdAndUpdate(id, { ...req.body }, { new: true } );
  res.redirect('/services');
}
exports.deleteService = async (req, res) => {
  const { id } = req.params;
  const faq = await Service.findByIdAndDelete(id);
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
exports.showFaq = async (req, res) => {
  const { id } = req.params;
  const faq = await FAQ.findById(id);
  res.render('editFaq', {title: 'Edit Faq', faq})
}
exports.updateFaq = async (req,res) => {
  const { id } = req.params;
  const faq = await FAQ.findByIdAndUpdate(id, { ...req.body }, { new: true } );
  res.redirect('/faqs');
}
exports.deleteFaq = async (req, res) => {
  const { id } = req.params;
  const faq = await FAQ.findByIdAndDelete(id);
  res.redirect('/faqs');
};

// CONTACTS
exports.contactPage = async (req, res) => {
  const services = await Service.find();
  res.render('contact', { title: 'Contact Us', services})
};
exports.createMessage = async (req, res) => {
  const contact = await (new Contact(req.body)).save();
  // await mail.sendMail
  const message = req.body
  const deliveryDate = (message.deliveryDate) || 'TBD'
  // console.log(messageInterests)
  await mail.send({
    email: message.email,
    message: message.message,
    subject: message.subject,
    name: message.name,
    deliveryDate: deliveryDate,
    interests: message.interests
  });
  res.redirect('/');
};


// ABOUT
exports.aboutPage = (req, res) => {
  res.render('about', { title: 'About the Baker'})
};


// CAKE CARE
exports.cakeCare = (req, res) => {
  res.render('cakeCare', {title: 'Cake Care'})
};


// ORDERS
exports.orderForm = async (req, res) => {
  const services = await Service.find();
  res.render('order', {title: 'Create an Order', services} )
}
