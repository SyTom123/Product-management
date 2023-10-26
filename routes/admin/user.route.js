const express = require ('express');
const controller = require("../../controllers/admin/user.controller");
const router = express.Router();

router.get("/",controller.index);

router.get("/detail/:id",controller.detail);

router.patch("/change-status/:status/:id",controller.changeStatus);

router.delete("/delete/:id",controller.delete);

module.exports = router;