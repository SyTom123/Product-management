const Account = require("../../models/account.model");
const Roles = require("../../models/role.modle");
const systemConfig = require("../../config/system");
const md5 = require("md5");
const Accounts = require("../../models/account.model");

// [GET]/admin/accounts/index
module.exports.index = async (req, res) => {
    const records = await Account.find({
        deleted: false,
    });

    for (const record of records) {
        const role = await Roles.findOne({
            _id: record.role_id,
        });
        record.role = role;
    }

    res.render("admin/pages/accounts/index", {
        records: records,
        status_06: 'active'
    });
};

// [GET]/admin/accounts/create
module.exports.create = async (req, res) => {
    const roles = await Roles.find({
        deleted: false,
    });

    res.render("admin/pages/accounts/create", {
        pageTitle: "Tạo mới tài khoản",
        roles: roles,
    });
};
// [POST]/admin/accounts/create
module.exports.createPost = async (req, res) => {
    req.body.password = md5(req.body.password);

    const record = new Account(req.body);
    await record.save();

    req.flash("success", "Thêm tài khoản mới thành công");
    res.redirect(`/${systemConfig.prefix_admin}/accounts`);
};

// [GET]/admin/accounts/edit/:id
module.exports.edit = async (req, res) => {

    const id = req.params.id;
    const record = await Account.findOne({
        _id: id,
        deleted: false,
    });
    const roles = await Roles.find({
        deleted: false,
    });


    res.render("admin/pages/accounts/edit", {
        pageTitle: "Cập nhật tài khoản",
        record: record,
        roles: roles
    });
}
// [PATCH]/admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {

    if (req.body.password) {
        req.body.password = md5(req.body.password);
    }
    else {
        delete req.body.password;
    }
    await Account.updateOne({ _id: req.params.id }, req.body);
    req.flash("success", "Chỉnh sửa tài khoản thành công");

    res.redirect("back");
}
//[GET]/accounts/detail/:id
module.exports.detail = async(req, res) => {

    const id = req.params.id;
    const record = await Accounts.findOne({
        _id: id,
        deleted: false
    }, )
    const role = await Roles.findOne({
        _id: record.role_id,
        deleted: false
    });
    record.role = role;
    res.render("admin/pages/accounts/detail", {
        pageTitle: "Chi tiết tài khoản",
        record: record,
    })
}
//[PATCH]/accounts/delete/:id
module.exports.delete = async(req, res) => {

    const id = req.params.id;

    await Accounts.updateOne({_id: id}, {deleted: true});
    req.flash("success", "Xoá tài khoản thành công!");
    
    res.redirect(`/${systemConfig.prefix_admin}/accounts`);
}
//[POST]/accounts/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;
    
    const result = await Accounts.updateOne ({
        _id: id
    }, {
        status: status
    });

    if(result) {
        req.flash("success", "Thay đổi trạng thái thành công!");
    }
    res.redirect("back");
}