const User = require("../../models/user.model");
const systemConfig = require("../../config/system");
//[GET]/users/index
module.exports.index =  async(req, res) => {
    const records = await User.find({
        deleted: false
    })
    res.render("admin/pages/users/index.pug", {
        pageTitle: "Danh sách user",
        records: records
    })
}
//[PATCH]/users/change-status/:status/:id
module.exports.changeStatus =  async(req, res) => {

    const status = req.params.status;
    const id = req.params.id;

    await User.updateOne({_id: id},{
        status: status
    })
    req.flash("success", "Cập nhật trạng thái thành công!");
    res.redirect("back");
}
//[GET]/users/detail/:id
module.exports.detail =  async(req, res) => {
    const id = req.params.id;

    const record = await User.findOne({
        _id: id,
        deleted: false
    })
    res.render("admin/pages/users/detail.pug", {
        pageTitle: "Chi tiết user",
        records: record
    })
}
//[GET]/users/delete/:id
module.exports.delete =  async(req, res) => {
    const id = req.params.id;
    await User.updateOne({_id: id}, {
        deleted: true
    });
    req.flash("success", 'Xóa tài khoản thành công!');
    res.redirect(`/${systemConfig.prefix_admin}/users`)
}