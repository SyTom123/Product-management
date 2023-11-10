const User = require("../../models/user.model");
const RoomChat = require("../../models/rooms-chat.model");
//[GET] /rooms-chat
module.exports.index = async (req, res) => {
    const userId = res.locals.user.id;

    const listRoomChat = await RoomChat.find({
        "users.user_id": userId,
        typeRoom: "group",
        deleted: false,
    });
    res.render("client/pages/rooms-chat/index", {
        pageTitle: "Danh sách phòng chat",
        listRoomChat: listRoomChat,
    });
};

//[GET] /rooms-chat/create
module.exports.create = async (req, res) => {
    const friendList = res.locals.user.friendList;

    for (const friend of friendList) {
        const infoFriend = await User.findOne({
            _id: friend.user_id,
        }).select("fullName avatar");

        friend.infoFriend = infoFriend;
    }

    res.render("client/pages/rooms-chat/create", {
        pageTitle: "Tạo mới phòng chat",
        friendList: friendList,
    });
};
//[POST] /rooms-chat/create
module.exports.createPost = async (req, res) => {
    const title = req.body.title;
    const userId = req.body.usersId;

    if(userId) {
        let usersArr = [];
        if(typeof userId == "object") {
            usersArr = [...usersArr, ...userId]
        }
        else {
            usersArr.push(userId);
        }

        const dataChat = {
            title: title,
            typeRoom: "group",
            users: [],
        };

        usersArr.forEach((userId) => {
            dataChat.users.push({
                user_id: userId,
                role: "user",
            });
        });
    }
    
    dataChat.users.push({
        user_id: res.locals.user.id,
        role: "superAdmin",
    });
    const room = new RoomChat(dataChat);
    await room.save();
    res.redirect(`/chat/${room.id}`);
};

//[GET] /rooms-chat/:id/addMember
module.exports.addMember = async (req, res) => {
    const roomChatId = req.params.id;
    const friendList = res.locals.user.friendList;

    for (const friend of friendList) {
        const infoFriend = await User.findOne({
            _id: friend.user_id,
        }).select("fullName avatar");

        friend.infoFriend = infoFriend;
    }
    res.render("client/pages/rooms-chat/add-member", {
        pageTitle: "Thêm thành viên",
        friendList: friendList,
        roomChatId: roomChatId,
    });
};


//[POST] /rooms-chat/:id/create
module.exports.addMemberPost = async (req, res) => {
    const roomChatId = req.params.id;
    const usersId = req.body.usersId;

    if(!usersId) {
        res.redirect(`/chat/${roomChatId}`);
        return
    };

    let usersArr = [];

    if(typeof usersId == "object") {
        usersArr = [...usersArr, ...usersId]
    }
    else {
        usersArr.push(usersId);
    }
    
    const roomChat = await RoomChat.findOne({
        _id: roomChatId,
        deleted: false,
    });

    var superAdminId = "";
    roomChat.users.forEach((item) => {
        if (item.role == "superAdmin") {
            superAdminId = item.user_id;
        }
    });

    if (superAdminId != res.locals.user.id) {
        res.redirect("/");
        return;
    }
    
    for(const userId of usersArr) {
        const existUserInGroup = await RoomChat.findOne({
            _id: roomChatId,
            typeRoom: "group",
            "users.user_id": userId,
            deleted: false
        });
        if(!existUserInGroup) {
            await RoomChat.updateOne({
                _id: roomChatId,
            }, 
            {
                $push: {
                    users: {
                        user_id: userId,
                        role: "user"
                    }
                }
            })
        }
       
    }
    res.redirect(`/chat/${roomChatId}`);
};
//[DELETE] /rooms-chat/:id
module.exports.delete = async (req, res) => {
    const roomChatId = req.params.id;
    const roomChat = await RoomChat.findOne({
        _id: roomChatId,
        deleted: false,
    });

    var superAdminId = "";
    roomChat.users.forEach((item) => {
        if (item.role == "superAdmin") {
            superAdminId = item.user_id;
        }
    });

    if (superAdminId != res.locals.user.id) {
        res.redirect("/");
        return;
    }
    await RoomChat.updateOne ({
        _id: roomChatId,
    }, {
        deleted: true
    })
    req.flash("success", "Xóa phòng chat thành công !");
    res.redirect(`/rooms-chat`);
};
