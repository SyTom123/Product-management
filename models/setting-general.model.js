const mongoose = require('mongoose');
const settingGeneralSchema = mongoose.Schema({
    websiteName: String,
    logo: String,
    phone: String,
    email: String,
    address: String,
    copyRight: String,
    map: String
}, { timestamps: true })
const SettingGeneral = mongoose.model("SettingGeneral", settingGeneralSchema, "setting-general");
module.exports = SettingGeneral;