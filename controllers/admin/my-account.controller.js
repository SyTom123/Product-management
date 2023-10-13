const Account = require("../../models/account.model.js");
const md5 = require('md5');

//[GET]/admin/my-account
module.exports.index = async(req, res) => {
    res.render('admin/pages/my-account/index',{
        pageTitle: "Tài khoản của tôi"
    })
}

//[GET]/admin/my-account/edit
module.exports.edit = async(req, res) => {
    res.render('admin/pages/my-account/edit',{
        pageTitle: "Chỉnh sửa tài khoản của tôi"
    })
}

//[PATCH]/admin/my-account/editPatch
module.exports.editPatch = async(req, res) => {
    if(req.body.password) {
        req.body.password = md5(req.body.password);
    }
    else {
        delete req.body.password;
    }

    await Account.updateOne({_id: res.locals.user.id},req.body);

    res.redirect("back");
}