const User = require("../../models/user.model");
const RoomChat = require("../../models/rooms-chat.model");
//[GET] /rooms-chat
module.exports.index = async(req, res) => {
    res.render("client/pages/rooms-chat/index", {
        pageTitle: "Danh sách phòng chat"
    })
}

//[GET] /rooms-chat/create
module.exports.create = async(req, res) => {
    const friendList = res.locals.user.friendList;

    for(const friend of friendList) {
        const infoFriend =  await User.findOne({
            _id: friend.user_id
        }).select("fullName avatar");

        friend.infoFriend = infoFriend
    }
    res.render("client/pages/rooms-chat/create", {
        pageTitle: "Tạo mới phòng chat",
        friendList: friendList
    })
}
//[POST] /rooms-chat/create
module.exports.createPost = async(req, res) => {
    const title = req.body.title;
    const usersId = req.body.usersId;

    const dataChat = {
        title: title,
        typeRoom : "group",
        users: [],
    }
    usersId.forEach(userId => {
        dataChat.users.push ({
            user_id: userId,
            role: "user"
        })
    })

    dataChat.users.push ({
        user_id: res.locals.user.id,
        role: "superAdmin"
    })
    const room = new RoomChat(dataChat);
    await room.save();
    res.redirect(`/chat/${room.id}`);
}