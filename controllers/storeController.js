const mongoose = require('mongoose');
const Flavor = mongoose.model('Flavor');
const Service = mongoose.model('Service');
const User = mongoose.model('User');
const FAQ = mongoose.model('FAQ');
const Contact = mongoose.model('Contact')
const Order = mongoose.model('Order')
const mail = require('../handlers/mail');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const jimp = require('jimp');
const { v4: uuidv4 } = require('uuid');


// HOMPAGE
exports.homePage = (req, res) => {
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
  const service = new Service(req.body)
  service.image = {url:req.file.path, fileName:req.file.filename}
  await service.save();
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
  service.image = {url:req.file.path, fileName:req.file.filename}
  service.save()
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

exports.sanitizeMessage= (req, res, next) => {
  req.sanitizeBody('*').trim().escape();
  next();
}

exports.createMessage = async (req, res) => {
  const contact = await (new Contact(req.body)).save();
  // const message = req.body
  const deliveryDate = (contact.deliveryDate) || 'TBD'
  console.log(contact.interests)
  // console.log(messageInterests) should create join with , lookup
  await mail.sendContactInfo({
    email: contact.email,
    message: contact.message,
    subject: contact.subject,
    name: contact.name,
    deliveryDate: deliveryDate,
    interests: contact.interests
  });
  req.flash('success', 'Your Contact Email Has Been Sent!')
  res.redirect('/');
};

exports.sanitizeEmail = (req, res, next) => {
  req.sanitizeBody('*').trim().escape();
  next();
}
exports.saveEmail = async (req, res) => {
  const email = await (new Contact(req.body)).save();
  req.flash('success', `${req.body.email} Has Been Added to our Newsletter!`)
  res.redirect('/');
}


// ORDERS
exports.orderForm = async (req, res) => {
  res.render('order', {title: 'Create an Order'} )
}

exports.sanitizeOrder = (req, res, next) => {
  req.sanitizeBody('*').trim().escape();
  next();
}

exports.newOrder = async (req, res) => {
  // console.log(req.files);
  const order = (new Order(req.body))
  // creating array for images uploaded
  order.images = req.files.map(file => ({url:file.path, filename:file.filename}));
  order.orderID = Date.now();
  await order.save()
  console.log(order)
  await mail.sendOrderInfo(order)
  req.flash('success', `Your Order ${order.orderID} Request Email Has Been Sent!`)
  res.redirect('/')
}
exports.searchOrder = async (req, res) => {
  // const { orderID } = req.params;
  const order = await Order.find()
  // console.log(order)
  res.render('searchOrder', {order})
}
exports.getByOrderID = async (req, res) => {
  console.log(req.query)
  const { orderID } = req.query;


  const order = await Order.findOne({orderID}, (error, data) => {
    if(error) {
      console.log(error)
    } else {
      console.log(data)
    }
  });

  // res.send("Order Info here", {order})
  res.render('showOrder', {title: 'Show Order', order})
}


// ABOUT
exports.aboutPage = (req, res) => {
  res.render('about', { title: 'About the Baker'})
};


// CAKE CARE
exports.cakeCare = (req, res) => {
  res.render('cakeCare', {title: 'Cake Care'})
};


//GALLERY
exports.showGallery = (req, res) => {
  res.render('gallery', { title: 'Gallery'})
}

//PRIVACY POLICY
exports.getPrivacy = (req, res) => {
  res.render('privacy', { title: 'Privacy Policy'})
};

//THROWBACKS
exports.getThrowbacks = (req, res) => {
  res.render('throwbacks', {title: 'Throwbacks'})
}

//IMAGE UPLOAD
exports.imagesUpload = upload.array('images')
