const express = require('express');
const router = express.Router();
const controller = require("../../controllers/admin/role.controller.js");

router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create", controller.createPost);

router.get("/permissions", controller.permissions);

router.patch("/permissions", controller.permissionsPatch);

router.get("/edit/:id", controller.edit);

router.get("/detail/:id", controller.detail);

router.delete("/delete/:id", controller.delete);

router.patch("/edit/:id", controller.editPatch);

module.exports = router;