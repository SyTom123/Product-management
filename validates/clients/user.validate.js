module.exports.registerPost = async (req, res, next) => {
    if(!req.body.fullName) {
        req.flash("error", `Họ tên không được để trống`);
        res.redirect("back");
        return;
    }
    if(!req.body.email) {
        req.flash("error", `Email không được để trống`);
        res.redirect("back");
        return;
    }
    if(!req.body.password) {
        req.flash("error", `Password không được để trống`);
        res.redirect("back");
        return;
    }
    if(req.body.rePassword !== req.body.password) {
        req.flash("error", `Password không khớp nhau`);
        res.redirect("back");
        return;
    }
    // const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // if(!regex.test(req.body.password)) {
    //     req.flash("error", `Password yếu`);
    //     res.redirect("back");
    //     return;
    // }
    next();
}
module.exports.loginPost = async(req, res, next) => {
    if(!req.body.email) {
        req.flash("error", `Email không được để trống`);
        res.redirect("back");
        return;
    }
    if(!req.body.password) {
        req.flash("error", `Password không được để trống`);
        res.redirect("back");
        return;
    }
    next();
}

module.exports.forgotPasswordPost = async(req, res, next) => {
    if(!req.body.email) {
        req.flash("error", `Email không được để trống`);
        res.redirect("back");
        return;
    }
    next();
}

module.exports.resetPasswordPost = async(req, res, next) => {
    if(!req.body.password) {
        req.flash("error",`Mật khẩu không được để trống.` );
        res.redirect("back");
        return;
    }
    if(!req.body.confirmPassword) {
        req.flash("error",`Vui lòng xác nhận lại mật khẩu.` );
        res.redirect("back");
        return;
    }
    if(req.body.confirmPassword != req.body.password ) {
        req.flash("error",`Xác nhận mật khẩu không trùng khớp.` );
        res.redirect("back");
        return;
    }
    // const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // if(!regex.test(req.body.password)) {
    //     req.flash("error", `Mật khẩu yếu`);
    //     res.redirect("back");
    //     return;
    // }
    next();
 }