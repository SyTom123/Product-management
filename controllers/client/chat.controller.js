const Chat = require('../../models/chat.model');
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
   
    res.render("client/pages/chat/index", {
        pageTitle: "Chat",
        chats: chats
    });
};