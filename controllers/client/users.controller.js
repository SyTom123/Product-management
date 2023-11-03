const User = require("../../models/user.model");

const usersSocket = require("../../sockets/client/users.socket");
//[GET]/users/not-friends
module.exports.notFriend = async (req, res) => {

    // Socket
    usersSocket(res);
    // Socket

    const userId = res.locals.user.id;
    const myUser = await User.findOne({
        _id: userId
    })
    const requestFriends = myUser.requestFriends;
    const acceptFriends = myUser.acceptFriends;
    const users = await User.find({
        $and:[
            {_id: {$ne: userId}},
            {_id: {$nin: requestFriends}},
            {_id: {$nin: acceptFriends}}
        ],
        status: "active",
        deleted: false
    }).select("avatar fullName");

    res.render("client/pages/users/not-friends",{
        pageTitle: "Danh sách người dùng",
        users: users
    });

}
//[GET]/users/request
module.exports.request = async (req, res) => {
    // Socket
    usersSocket(res);
    // Socket
    const userId = res.locals.user.id;

    const myUser = await User.findOne({
        _id: userId
    })

    const requestFriends = myUser.requestFriends;

    const users = await User.find({
        _id: {$in: requestFriends},
        status: "active",
        deleted: false
    }).select("id fullName avatar");

    
    res.render("client/pages/users/request",{
        pageTitle: 'Lời mời đã gửi',
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