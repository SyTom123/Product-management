const express = require('express');
const multer = require('multer');

const router = express.Router();
const constroller = require('../../controllers/admin/product-category.controller');
const upload = multer();

const uploadCloud = require('../../middlewares/admin/uploadCloud.middleware');

router.get("/", constroller.index);

router.get("/create", constroller.create);

router.post("/create", 
    upload.single("thumbnail"),
    uploadCloud.upload,
    constroller.createPost);

module.exports = router;