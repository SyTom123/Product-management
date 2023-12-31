const express = require('express');
const multer = require('multer');

const router = express.Router();
const controller = require('../../controllers/admin/product-category.controller');
const upload = multer();

const uploadCloud = require('../../middlewares/admin/uploadCloud.middleware');

router.get("/", controller.index);

router.get("/create", controller.create);

router.patch("/change-status/:status/:id", controller.changeStatus);

router.delete("/delete/:id", controller.delete);

router.post("/create", 
    upload.single("thumbnail"),
    uploadCloud.upload,
    controller.createPost);

router.get("/edit/:id", controller.edit);

router.patch("/edit/:id", 
    upload.single("thumbnail"),
    uploadCloud.upload,
    controller.editPatch);

router.get("/detail/:id", controller.detail);
module.exports = router;