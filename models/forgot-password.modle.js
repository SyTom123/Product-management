const mongoose = require('mongoose');
const forgotPasswordSchema = new mongoose.Schema({
    email: String,
    otp: String,
    createdOn: {
      type: Date,
      
    }
}, {timestamps:true});

forgotPasswordSchema.pre("save", function(next) { 
    this.sessionActivity = new Date(); 
    next(); 
});
forgotPasswordSchema.index({createdOn: 1}, {expireAfterSeconds: 160});
const ForgotPassword = mongoose.model("ForgotPassword", forgotPasswordSchema, "forgot-password");
module.exports = ForgotPassword;