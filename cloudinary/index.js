const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name:  process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET
})

// sets the cloudinary folder to save to and the allowed formats for savings purposes
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'SugarSpells',
    allowedFormats: ['jpeg', 'png', 'jpg', 'svg']
  }

});

module.exports= {
  cloudinary,
  storage
}
