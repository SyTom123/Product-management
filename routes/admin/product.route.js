const express = require('express');
const router = express.Router();
const multer = require('multer');
const controller = require('../../controllers/admin/product.controller');
const validate = require("../../validates/admin/product.validate");

const storageMulter = require('../../helper/storageMulter');
const storage = storageMulter();


const upload = multer({ storage: storage })

router.get("/", controller.index );

router.patch("/change-status/:status/:id", controller.changeStatus );

router.patch("/change-multi", controller.changeMulti);

router.delete("/delete/:id", controller.deleteItem);

router.get("/create", controller.create);

router.post("/create", 
    upload.single('thumbnail'), 
    validate.createPost,
    controller.createPost);

module.exports = router;