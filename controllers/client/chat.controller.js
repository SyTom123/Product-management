const Chat = require('../../models/chat.model');
const RoomChat = require("../../models/rooms-chat.model");
const User = require("../../models/user.model");
const uploadToCloudinary = require("../../helper/uploadCloudinary");
const chatSocket = require("../../sockets/client/chat.socket");

//[GET]/chat/:roomChatId
module.exports.index = async (req, res) => {
    const roomChatId = req.params.roomChatId;
    // socket io
    chatSocket(req, res);

    // socket io
    // Lấy ra data 
    const chats = await Chat.find(
        {
            deleted: false,
            room_chat_id: roomChatId
        }
    )
    for(const chat of chats) {
        const infoUser = await User.findOne({
            _id: chat.userId
        }).select("fullName");
        chat.infoUser = infoUser;

    }

    const roomChat = await RoomChat.findOne ({
        _id: roomChatId,
        deleted: false
    }).select("_id title users typeRoom");

    for(const user of roomChat.users) {
        const infoUser = await User.findOne({
            _id: user.user_id
        }).select ("avatar fullName");

        if(user.role == "superAdmin") {
            roomChat.superAdminId = user.user_id
        }
        
        user.infoUser = infoUser;
    }
    res.render("client/pages/chat/index", {
        pageTitle: "Chat",
        roomChat: roomChat,
        chats: chats
    });
};