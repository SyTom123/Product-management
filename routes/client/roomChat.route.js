const express = require('express');
const router = express.Router();
const controller = require('../../controllers/client/roomChat.controller');
const chatMiddleware = require("../../middlewares/client/chat.middleware");

router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create", controller.createPost);

router.get("/:id/add-member", controller.addMember);

router.post("/:id/add-member", controller.addMemberPost);

module.exports = router;