const express = require('express');
const router = express.Router();
const controller = require("../../controllers/client/users.controller")
router.get("/not-friends", controller.notFriend);
router.get("/:id", controller.userInfo);


module.exports = router;