const express = require('express');
const router = express.Router();
const controller = require("../../controllers/client/orders.controller")

router.get("/", controller.index);

router.get("/detail/:id", controller.detail);

router.patch("/change-status/:status/:id", controller.changeStatus);

  
module.exports = router;    