const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { catchErrors } = require('../handlers/errorHandlers');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage })

router.get('/', storeController.homePage);

router.get('/login', userController.loginForm);
router.post('/login', authController.login);
router.get('/register', userController.registerForm);

// Registration routes
router.post('/register',
  userController.validateRegister,
  catchErrors(userController.register),
  authController.login
);

router.get('/logout', authController.logout);

//FAQ routes
router.get('/faqs', catchErrors(storeController.getFaqs));
router.get('/add-faq', authController.isLoggedIn, storeController.addFaq);
router.post('/add-faq', catchErrors(storeController.createFaq))
router.get('/faqs/:id', authController.isLoggedIn, catchErrors(storeController.showFaq));
router.put('/faqs/:id', authController.isLoggedIn, catchErrors(storeController.updateFaq))
router.delete('/faqs/:id', catchErrors(storeController.deleteFaq))

// Flavor routes
router.get('/flavors', catchErrors(storeController.getFlavors));
router.get('/add-flavors', authController.isLoggedIn, storeController.addFlavor);
router.post('/add-flavors',catchErrors(storeController.createFlavor));
router.get('/flavors/:id', authController.isLoggedIn, catchErrors(storeController.showFlavor));
router.put('/flavors/:id', authController.isLoggedIn, catchErrors(storeController.updateFlavor))
router.delete('/flavors/:id', catchErrors(storeController.deleteFlavor));

// Service routes
router.get('/services', catchErrors(storeController.getServices));
router.get('/add-services', authController.isLoggedIn, storeController.addService)
router.post('/add-services',storeController.imagesUpload, catchErrors(storeController.createService));
router.get('/services/:id', authController.isLoggedIn, catchErrors(storeController.showService));
router.put('/services/:id', authController.isLoggedIn, storeController.imagesUpload, catchErrors(storeController.updateService))
router.delete('/services/:id', catchErrors(storeController.deleteService))

// Contact routes
router.get('/contact', storeController.contactPage);
router.post('/contact', storeController.sanitizeMessage, catchErrors(storeController.createMessage));
router.post('/add-contact', storeController.sanitizeEmail, catchErrors(storeController.saveEmail))

// About route
router.get('/about', storeController.aboutPage)

// Cake Care Route
router.get('/cake-care', storeController.cakeCare)

// Order Route
router.get('/order', storeController.orderForm);
router.post('/new-order', storeController.imagesUpload, storeController.sanitizeOrder, catchErrors(storeController.newOrder));
router.get('/order-search', storeController.searchOrder)
router.get('/order/:orderID', catchErrors(storeController.getByOrderID))


//Gallery Route
router.get('/gallery', storeController.showGallery);

//Privacy Route
router.get('/privacy-policy', storeController.getPrivacy);

//Throwback Route
router.get('/throwbacks', storeController.getThrowbacks)

 module.exports = router;
