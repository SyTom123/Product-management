const mongoose = require('mongoose');
const generate = require("../helper/generate");

const accountSchema = mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    token: {
        type: String,
        default: generate.generateRandomString(30)
    },
    phone: String,
    avatar: String,
    role_id : String,
    status: String,
    deleted: {
        type:Boolean,
        default: false
    },
    deletedAt: Date
},{ timestamps: true });
const Accounts = mongoose.model("Accounts", accountSchema, "accounts");
module.exports = Accounts;