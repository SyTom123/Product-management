const SettingGeneral = require("../../models/setting-general.model");

//[GET]/settings/general
module.exports.index = async(req, res) => {

    const settingGeneral = await SettingGeneral.findOne({});
    res.render("admin/pages/settings/general.pug", {
        pageTitle: "Cài đặt chung",
        settingGeneral: settingGeneral,
        status_08: "active"
    });
}
//[PATCH]/settings/general
module.exports.generalPatch = async(req, res) => {
    const settingGeneral = await SettingGeneral.findOne({});
    if(settingGeneral) {
        await SettingGeneral.updateOne({
            _id: settingGeneral.id
        }, req.body);
    }
    else {
        const record = new SettingGeneral(req.body);
        await record.save();
    }
    req.flash("success",'Cập nhật thành công');
    res.redirect("back");
}   
