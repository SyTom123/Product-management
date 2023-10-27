const Chat = require('../../models/chat.model');
const User = require("../../models/user.model");
module.exports.index = async (req, res) => {
    const userId = res.locals.user.id;
    // socket io
    _io.once('connection', (socket)=> {
        socket.on("CLIEND_SEND_MESSAGE", async(content)=> {
            const data = {
                userId: userId,
                content: content
            }
            const chat = new Chat (data);
            await chat.save();
        })
    })

    // socket io
    // Lấy ra data 
    const chats = await Chat.find(
        {
            deleted: false
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