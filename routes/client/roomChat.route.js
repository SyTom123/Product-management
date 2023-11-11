const express = require('express');
const router = express.Router();
const controller = require('../../controllers/client/roomChat.controller');
const chatMiddleware = require("../../middlewares/client/chat.middleware");
const multer = require('multer');
const upload = multer();
const uploadCloud = require('../../middlewares/client/uploadCloud.middleware');

router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create", upload.single("avatar"), uploadCloud.upload, controller.createPost);

router.get("/:id/add-member", controller.addMember);

router.post("/:id/add-member", controller.addMemberPost);

router.delete("/delete/:id", controller.delete);

module.exports = router;