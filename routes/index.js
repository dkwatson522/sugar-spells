const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', storeController.homePage);

router.get('/login', userController.loginForm);
router.post('/login', authController.login);
router.get('/register', userController.registerForm);

// Registration routes
router.post('/register',
  userController.validateRegister,
  userController.register,
  authController.login
);

router.get('/logout', authController.logout);

//FAQ routes
router.get('/faqs', storeController.getFaqs);
router.get('/add-faq', storeController.addFaq);
router.post('/add-faq', storeController.createFaq)

// Contact routes
router.get('/contact', storeController.contactPage);
router.post('/contact', storeController.createMessage);

// Flavor routes
router.get('/flavors', storeController.getFlavors);
router.get('/add-flavors', storeController.addFlavor);
router.post('/add-flavors',storeController.createFlavor);

// Service routes
router.get('/services', storeController.getServices);
router.get('/add-services', storeController.addService)
router.post('/add-services', storeController.createService);

// About route
router.get('/about', storeController.aboutPage)

 module.exports = router;
