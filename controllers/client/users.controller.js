const User = require("../../models/user.model")
//[GET]/users/not-friends
module.exports.notFriend = async (req, res) => {

    const userId = res.locals.user.id;
    const users = await User.find({
        _id: {$ne: userId},
        status: "active",
        deleted: false
    }).select("avatar fullName");

    res.render("client/pages/users/not-friends",{
        pageTitle: "Danh sách người dùng",
        users: users
    });

}
//[GET]/users/:id
module.exports.userInfo = async (req, res) => {

    const userId = req.params.id;
    const data = await User.findOne({
        _id: userId,
        status: "active",
        deleted: false
    });


    res.render("client/pages/users/info-user",{
        pageTitle: "Thông tin người dùng",
        data: data
    });

}