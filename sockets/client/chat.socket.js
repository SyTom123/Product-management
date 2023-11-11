const Chat = require('../../models/chat.model');
const uploadToCloudinary = require("../../helper/uploadCloudinary");
const RoomChat = require('../../models/rooms-chat.model');

module.exports = async(req, res) => {
    const userId = res.locals.user.id;
    const fullName = res.locals.user.fullName;
    const roomChatId = req.params.roomChatId;

    _io.once('connection', (socket)=> {
        socket.join(roomChatId);

        socket.on("CLIEND_SEND_MESSAGE", async(data)=> {

            let images = [];
            for(const imageBuffer of data.images) {
                const link = await uploadToCloudinary(imageBuffer);
                images.push(link);
            }
            const record = {
                userId: userId,
                content: data.content,
                images: images,
                room_chat_id: roomChatId ,
            }
            const chat = new Chat (record);
            await chat.save();

             // Trả data về cho client
            _io.to(roomChatId).emit("SERVER_RETURN_MESSAGE",{
                userId: userId,
                fullName: fullName,
                content: data.content,
                images:images
            })
        });
        socket.on("CLIENT_SEND_TYPING", (type) => {
            socket.broadcast.to(roomChatId).emit("SERVER_RETURN_TYPING", {
              userId: userId,
              fullName: fullName,
              type: type
            });
        });

        // ADMIN_DELETE_MEMBER_OUT_GROUP
        socket.on("ADMIN_DELETE_MEMBER_OUT_GROUP", async(data)=> {
            if(userId  == data.superAdminId) {
                const roomChat = await RoomChat.findOne({
                    _id: data.roomChatId,
                    deleted: false,
                    "users.user_id": data.userIdB
                })
                if(roomChat) {
                    await RoomChat.updateOne({
                        _id: data.roomChatId,
                    }, {
                        $pull : {
                            users: {
                                user_id: data.userIdB
                            }
                        }
                    })
                }
            }
        } );


        // END ADMIN_DELETE_MEMBER_OUT_GROUP

        // ADMIN_DELETE_MEMBER_OUT_GROUP
        socket.on("MEMBER_LEAVE_GROUP", async(data)=> {
            const roomChat = await RoomChat.findOne({
                _id: data.roomChatId,
                deleted: false,
                "users.user_id": data.userIdB
            })
            if(roomChat) {
                await RoomChat.updateOne({
                    _id: data.roomChatId,
                }, {
                    $pull : {
                        users: {
                            user_id: data.userIdB
                        }
                    }
                })
            }
        } );


        // END ADMIN_DELETE_MEMBER_OUT_GROUP
    })
}