const express = require('express');
const router = express.Router();
const controller = require("../../controllers/admin/orders.controller.js");

router.get("/", controller.index);

router.get("/detail/:id", controller.detail);

router.patch("/change-status/:status/:id", controller.changeStatus);

router.delete("/delete/:id", controller.delete);


module.exports = router;