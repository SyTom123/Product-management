const User = require("../../models/user.model");
const Cart = require("../../models/cart.model");
const ForgotPassword = require("../../models/forgot-password.modle");
const generateHelper = require("../../helper/generate");
const md5 = require("md5");
const sendMailHelper = require("../../helper/sendMail");

//[GET] /user/register
module.exports.register = async(req, res) => {
    res.render("client/pages/user/register", {
        pageTitle: "Đăng ký tài khoản"
    })
}
//[POST] /user/register
module.exports.registerPost = async(req, res) => {

    const existEmail = await User.findOne({
        email: req.body.email,
    })

    if(existEmail) {
        req.flash("Error", "Email đã tồn tại");
        res.redirect("back");
        return;
    }

    req.body.password = md5(req.body.password);
    const user = new User(req.body);
    await user.save();

    req.flash("success", "Đăng ký thành công!");
    res.redirect("/user/login");
}

//[GET] /user/login
module.exports.login = async(req, res) => {
    res.render("client/pages/user/login", {
        pageTitle: "Đăng nhập tài khoản"
    })
}
//[POST] /user/login
module.exports.loginPost= async(req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({
        email: email,
        deleted: false
      });
    if(!user) {
        req.flash("error", "Email không tồn tại hoặc đã bị xóa!");
        res.redirect("back");
        return;
    }
    if(md5(password) != user.password) {
        req.flash("error", "Sai mật khẩu !");
        res.redirect("back");
        return;
    }

    if(user.status == "inactive") {
        req.flash("error", `Tài khoản đang bị khóa!`);
        res.redirect("back");
        return;
    }
    //  Lưu user_id vào collection cart;

    await User.updateOne({ _id: user.id},{
        statusOnline: "online"
    })

    _io.once('connection', (socket)=> {
        socket.broadcast.emit("SERVER_RETURN_USER_ONLINE", user.id)
    });
    
    await Cart.updateOne({
        _id: req.cookies.cartId
    }, {
        user_id: user.id
    })
    res.cookie("tokenUser", user.tokenUser);
    res.redirect("/");

}
//[GET] /user/logout
module.exports.logout = async(req, res) => {

    res.clearCookie("tokenUser");
    await User.updateOne({ _id: res.locals.user.id},{
        statusOnline: "offline"
    })

    
    _io.once('connection', (socket)=> {
        socket.broadcast.emit("SERVER_RETURN_USER_OFFLINE", res.locals.user.id)
    });
    
    res.redirect('/');
}
//[GET]/user/password/forgot
module.exports.forgotPassword = async(req, res) => {
    res.render("client/pages/user/forgot-password", {
        pageTitle: "Lấy lại mật khẩu"
    });
}

//[POST]/user/password/forgot
module.exports.forgotPasswordPost = async(req, res) => {
    const email = req.body.email;

    const user = await User.findOne({
        email: email,
        deleted: false
    })
    if(!user) {
        req.flash("error", "Email không tồn tại");
        res.redirect("back");
        return;
    }
    // Việc 1: Tạo mã OTP và lưu OTP, email vào collection forgot-password

    const otp = generateHelper.generateRandomNumber(8);
    const objectForgotPassword = {
        email: email,
        otp: otp,
        expireAt: Date.now()
    }
    const forgotPassword = new ForgotPassword(objectForgotPassword);
    await forgotPassword.save();

    // Việc 2: Gửi mã OTP qua email của user
    const subject = `Mã OTP xác minh lấy lại mật khẩu`;
    const html = `
    Mã OTP xác minh lấy lại mật khẩu là <b>${otp}</b>. Thời hạn sử dụng là 3 phút. 
    Lưu ý không được để lộ mã OTP.`;

    sendMailHelper.sendMail(email, subject, html);

    res.redirect(`/user/password/otp?email=${email}`);

}
//[GET]/user/password/otp
module.exports.otpPassword = async(req, res) => {
    const email = req.query.email;

    res.render("client/pages/user/otp-password", {
        pageTitle: "Nhập mã OTP",
        email: email,
      });
}
//[POST]/user/password/otp
module.exports.otpPasswordPost = async(req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;

    const result = await ForgotPassword.findOne({
        email: email,
        otp: otp
    });
    if(!result) {
        req.flash("error", `OTP không hợp lệ!`);
        res.redirect("back");
        return;
    }
    const user = await User.findOne({
        email: email
      });
    
    res.cookie("tokenUser", user.tokenUser);
    
    res.redirect("/user/password/reset");

}
//[GET]/user/password/reset
module.exports.resetPassword = async(req, res) => {
    res.render("client/pages/user/reset-password.pug", {
        pageTitle: "Đổi mật khẩu"
    });
}
//[POST]/user/password/reset
module.exports.resetPasswordPost = async(req, res) => {
    const password = req.body.password;
    const tokenUser = req.cookies.tokenUser;
    
    await User.updateOne({
        tokenUser: tokenUser
    }, {
        password: md5(password)
    });
    req.flash("success", "Đổi mật khẩu thành công");
    res.redirect("/");
}
//[GET] /user/info 
module.exports.info = async (req, res) => {
    res.render('client/pages/user/info', {
        pageTitle: "Thông tin tài khoản"
    })
}


//[GET] /user/edit/:id
module.exports.edit = async (req, res) => {
    const id = req.params.id;
    const user = await User.findOne({
        _id: id,
        deleted: false
    });

    res.render('client/pages/user/edit', {
        pageTitle: "Chỉnh sửa thông tin tài khoản",
        user: user
    })
}
//[PATCH] /user/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;

    if(req.body.password) {
        req.body.password = md5(req.body.password);
    }
    else {
        delete req.body.password;
    }
    await User.updateOne({_id: id}, req.body);
    req.flash("success", "Cập nhật tài khoản thành công!");
    res.redirect("/user/info");
}
//[PATCH] /user/delete/:id
module.exports.delete = async (req, res) => {
    const id = req.params.id;

    await User.updateOne({_id: id}, {
        deleted: true
    });
    res.clearCookie("tokenUser");
    req.flash("success", "Xóa tài khoản thành công!");
    res.redirect("/");
}
//[GET] /user/orders
module.exports.orders = async(req, res) => {
    res.render("client/pages/user/orders", {
        pageTitle: "Đơn hàng của tôi"
    })
}


