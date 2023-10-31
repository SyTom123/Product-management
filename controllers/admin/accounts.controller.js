const Account = require("../../models/account.model");
const Role = require("../../models/role.modle");
const systemConfig = require("../../config/system");
const md5 = require("md5");

// [GET]/admin/account/index
module.exports.index = async (req, res) => {
    const records = await Account.find({
        deleted: false,
    });

    for (const record of records) {
        const role = await Role.findOne({
            _id: record.role_id,
        });
        record.role = role;
    }

    res.render("admin/pages/accounts/index", {
        records: records,
        status_06: 'active'
    });
};

// [GET]/admin/account/create
module.exports.create = async (req, res) => {
    const roles = await Role.find({
        deleted: false,
    });

    res.render("admin/pages/accounts/create", {
        pageTitle: "Tạo mới tài khoản",
        roles: roles,
    });
};
// [POST]/admin/account/create
module.exports.createPost = async (req, res) => {
    req.body.password = md5(req.body.password);

    const record = new Account(req.body);
    await record.save();

    req.flash("success", "Thêm tài khoản mới thành công");
    res.redirect(`/${systemConfig.prefix_admin}/accounts`);
};

// [GET]/admin/account/edit/:id
module.exports.edit = async (req, res) => {

    const id = req.params.id;
    const record = await Account.findOne({
        _id: id,
        deleted: false,
    });
    const roles = await Role.find({
        deleted: false,
    });


    res.render("admin/pages/accounts/edit", {
        pageTitle: "Cập nhật tài khoản",
        record: record,
        roles: roles
    });
}
// [PATCH]/admin/account/edit/:id
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