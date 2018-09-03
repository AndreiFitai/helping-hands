const cloudinary = require("cloudinary");
const config = require("../config");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: config.CLOUDINARY_NAME,
  api_key: config.CLOUDINARY_KEY,
  api_secret: config.CLOUDINARY_SECRET
});

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "project2",
  allowedFormats: ["jpg", "png"],
  filename: function(req, file, cb) {
    cb(null, "my-file-name");
  }
});

const upload = multer({ storage: storage });
module.exports = upload;
