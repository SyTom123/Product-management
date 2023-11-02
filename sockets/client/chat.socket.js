const Chat = require('../../models/chat.model');
const uploadToCloudinary = require("../../helper/uploadCloudinary");

module.exports = async(res) => {
    const userId = res.locals.user.id;
    const fullName = res.locals.user.fullName;

    _io.once('connection', (socket)=> {
        socket.on("CLIEND_SEND_MESSAGE", async(data)=> {

            let images = [];
            for(const imageBuffer of data.images) {
                const link = await uploadToCloudinary(imageBuffer);
                images.push(link);
            }
            const record = {
                userId: userId,
                content: data.content,
                images: images
            }
            const chat = new Chat (record);
            await chat.save();

             // Trả data về cho client
            _io.emit("SERVER_RETURN_MESSAGE",{
                userId: userId,
                fullName: fullName,
                content: data.content,
                images:images
            })
        });
        socket.on("CLIENT_SEND_TYPING", (type) => {
            socket.broadcast.emit("SERVER_RETURN_TYPING", {
              userId: userId,
              fullName: fullName,
              type: type
            });
        });
    })
}