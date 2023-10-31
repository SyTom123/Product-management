const express = require('express');
const multer = require('multer');

const upload = multer();

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

const controller = require('../../controllers/admin/accounts.controller');
const router = express.Router();

router.get("/", controller.index);

router.get("/create", controller.create);

router.delete("/delete/:id", controller.delete);

router.post("/create",
    upload.single("avatar"),
    uploadCloud.upload,
    controller.createPost);

router.get("/edit/:id", controller.edit);

router.get("/detail/:id", controller.detail);

router.patch("/change-status/:status/:id", controller.changeStatus)

router.patch("/edit/:id",
    upload.single("avatar"),
    uploadCloud.upload,
    controller.editPatch);

module.exports = router;
