const express = require('express');
const router = express.Router();
const controller = require('../../controllers/client/user.controller');
const validate = require("../../validates/clients/user.validate");
const middleware = require("../../middlewares/client/auth.middlewares");
const multer = require('multer');

const upload = multer();

const uploadCloud = require('../../middlewares/client/uploadCloud.middleware');

router.get("/register", controller.register);

router.post("/register",validate.registerPost ,controller.registerPost);

router.get("/login", controller.login);

router.post("/login",validate.loginPost, controller.loginPost);

router.get("/logout", controller.logout);

router.get("/password/forgot", controller.forgotPassword);

router.post("/password/forgot",validate.forgotPasswordPost ,controller.forgotPasswordPost);

router.get("/password/otp", controller.otpPassword);

router.post("/password/otp", controller.otpPasswordPost);

router.get("/password/reset", controller.resetPassword);

router.post("/password/reset",validate.resetPasswordPost, controller.resetPasswordPost);

router.get("/info", middleware.requireAuth ,controller.info);

router.get("/edit/:id", controller.edit);

router.patch("/edit/:id", upload.single("avatar"), uploadCloud.upload,
    controller.editPatch);

router.delete("/delete/:id", controller.delete);
  
module.exports = router;    