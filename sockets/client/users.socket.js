const User = require("../../models/user.model");
const RoomChat = require("../../models/rooms-chat.model");
module.exports = async (res) => {
    _io.once("connection", (socket) => {

        // Người dùng gửi yêu cầu kết bạn
        socket.on("CLIENT_ADD_FRIEND", async (userId) => {
            const myUserId = res.locals.user.id;
            // Thêm id của A vào acceptFriends của B
            const existUserAinB = await User.findOne({
                _id: userId,
                acceptFriends: myUserId,
            });
            if (!existUserAinB) {
                await User.updateOne(
                    {
                        _id: userId,
                    },
                    {
                        $push: {
                            acceptFriends: myUserId,
                        },
                    }
                );
            }
            // Thêm id của B vào requestFriends của A
            const existUserBinA = await User.findOne({
                _id: myUserId,
                requestFriends: userId,
            });

            if (!existUserBinA) {
                await User.updateOne(
                    {
                        _id: myUserId,
                    },
                    {
                        $push: {
                            requestFriends: userId,
                        },
                    }
                );
            }
            // Lấy độ dài acceptFriends của B trả về cho B
            const infoUserB = await User.findOne({
                _id: userId,
            })
            const lengthAcceptFriends = infoUserB.acceptFriends.length;
            socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", {
                userId: userId,
                lengthAcceptFriends: lengthAcceptFriends
            });

            
            // Lấy thông tin của A trả về cho B
            const infoUserA = await User.findOne({
                _id: myUserId
            }).select("id avatar fullName");

            socket.broadcast.emit("SERVER_RETURN_INFO_ACCEPT_FRIEND", {
                userId: userId,
                infoUserA: infoUserA
            });
        });

        // Người dùng hủy gửi yêu cầu kết bạn
        socket.on("CLIENT_CANCEL_FRIEND", async (userId) => {
            const myUserId = res.locals.user.id;
           
            // userId : id của B
            // myUserId : id của A
            // Xóa id của A trong acceptFriends của B
            const existUserAInB = await User.findOne({
                _id: userId,
                acceptFriends: myUserId
              });
        
              if(existUserAInB) {
                await User.updateOne({
                  _id: userId
                }, {
                  $pull: { acceptFriends: myUserId }
                });
              }
            // Xóa id của B trong requestFriends của A
            // Xóa id của B trong requestFriends của A
            const existUserBInA = await User.findOne({
                _id: myUserId,
                requestFriends: userId
            });

            if(existUserBInA) {
                await User.updateOne({
                _id: myUserId
                }, {
                $pull: { requestFriends: userId }
                });
            }
          
            //  Lấy độ dài acceptFriends của B trả về cho B
            const infoUserB = await User.findOne({
                _id: userId,
            })
            const lengthAcceptFriends = infoUserB.acceptFriends.length;

            socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", {
                userId: userId,
                lengthAcceptFriends: lengthAcceptFriends
            });

        // Lấy userId của A trả về cho B
            socket.broadcast.emit("SERVER_RETURN_USER_ID_CANCEL_FRIEND", {
                userId: userId,
                userIdA: myUserId
            });
            
        });

         // Người dùng từ chối kết bạn
        socket.on("CLIENT_REFUSE_FRIEND", async (userId) => {
            const myUserId = res.locals.user.id;
            //myUserId: id của B
            //userId: id của A

            // Xóa id của A trong acceptFriends của B
            const existUserAInB = await User.findOne({
                _id: myUserId,
                acceptFriends: userId,
            });
            if (existUserAInB) {
                await User.updateOne(
                    {
                        _id: myUserId
                    },
                    {
                        $pull: { acceptFriends: userId },
                    }
                );
            }

            // Xóa id của B trong requestFriends của A
            const existUserBInA = await User.findOne({
                _id: userId ,
                requestFriends: myUserId,
            });

            if (existUserBInA) {
                await User.updateOne(
                    {
                        _id: userId,
                    },
                    {
                        $pull: { requestFriends: myUserId },
                    }
                );
            }
        });

        // Người dùng chấp nhận kết bạn
        socket.on("CLIENT_ACCEPT_FRIEND", async (userId) => {
            const myUserId = res.locals.user.id;
            //myUserId: id của B
            //userId: id của A
            const existUserAInB = await User.findOne({
                _id: myUserId,
                acceptFriends: userId,
            });

            const existUserBInA = await User.findOne({
                _id: userId ,
                requestFriends: myUserId,
            });
            
            // Tạo phòng chat chung
            let roomChat = "";
            if(existUserAInB && existUserBInA) {
                console.log(userId);
                console.log(myUserId);
                roomChat = new RoomChat({
                    typeRoom: "friend",
                    users: [
                      {
                        user_id: userId,
                        role: "superAdmin"
                      },
                      {
                        user_id: myUserId,
                        role: "superAdmin"
                      }
                    ]
                });
                await roomChat.save();
            }

            // Xóa id của A trong acceptFriends của B
            //Thêm {user_id room_chat_id} của A vào frendList của B

            if (existUserAInB) {
                await User.updateOne(
                    {
                        _id: myUserId,
                    },
                    {   
                        $push: {
                            friendList: {
                              user_id: userId,
                              room_chat_id: roomChat.id
                            }
                          },
                        $pull: { acceptFriends: userId }
                    }
                );
            }

            // Xóa id của B trong requestFriends của A
            //Thêm {user_id room_chat_id} của B vào frendList của A


            if (existUserBInA) {
                await User.updateOne(
                    {
                        _id: userId,
                    },
                    {
                        $push: {
                            friendList: {
                              user_id: myUserId,
                              room_chat_id: roomChat.id
                            }
                          },
                        $pull: { requestFriends: myUserId }
                    }
                );
            }
        });
    });
};
