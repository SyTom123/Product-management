const express = require('express');
const router = express.Router();
const controller = require('../../controllers/client/roomChat.controller');
const chatMiddleware = require("../../middlewares/client/chat.middleware")
router.get("/", controller.index);

module.exports = router;