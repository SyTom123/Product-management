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