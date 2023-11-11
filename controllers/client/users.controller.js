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
    const friendList = myUser.friendList;

    const friendListId = friendList.map(item => item.user_id);

    const users = await User.find({
        $and:[
            {_id: {$ne: userId}},
            {_id: {$nin: requestFriends}},
            {_id: {$nin: acceptFriends}},
            {_id: {$nin: friendListId}},
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
//[GET]/users/accept
module.exports.accept = async (req, res) => {
    // Socket
    usersSocket(res);
    // Socket
    const userId = res.locals.user.id;

    const myUser = await User.findOne({
        _id: userId
    })

    const acceptFriends = myUser.acceptFriends;

    const users = await User.find({
        _id: {$in: acceptFriends},
        status: "active",
        deleted: false
    }).select("id fullName avatar");

    res.render("client/pages/users/accept",{
        pageTitle: 'Lời mời đã nhận',
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
//[GET]/users/friends
module.exports.friends = async (req, res) => {

    // Socket
    usersSocket(res);
    // Socket
    const userId = res.locals.user.id;

    const myUser = await User.findOne({
        _id: userId
    })
    const friendList = myUser.friendList;
    const friendListId = friendList.map(item => item.user_id);

    const users = await User.find({
        _id: {$in: friendListId},
        status: "active",
        deleted: false
    }).select("id fullName avatar statusOnline ");

    users.forEach(user => {
        const infoUser = friendList.find(item => item.user_id == user.id);
        user.roomChatId = infoUser.room_chat_id;
    })

    res.render("client/pages/users/friends",{
        pageTitle: 'Danh sách bạn bè',
        users: users
    });
}