const md5 = require('md5');
module.exports.login = async(req, res) => {
    res.render("admin/pages/auth/login.pug", {
        pageTitle: "Đăng nhập"
    })
}