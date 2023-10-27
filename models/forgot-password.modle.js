const mongoose = require('mongoose');
const forgotPasswordSchema = new mongoose.Schema({
    email: String,
    otp: String,
    expireAt: {
      type: Date,
      expires: 180
    }
}, {timestamps:true});

forgotPasswordSchema.index({createdOn: 1}, {expireAfterSeconds: 180});
const ForgotPassword = mongoose.model("ForgotPassword", forgotPasswordSchema, "forgot-password");
module.exports = ForgotPassword;