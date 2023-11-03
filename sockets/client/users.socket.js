const User = require("../../models/user.model");
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
        });

        // Người dùng hủy gửi yêu cầu kết bạn
        socket.on("CLIENT_CANCEL_FRIEND", async (userId) => {
            const myUserId = res.locals.user.id;
           
            // Xóa id của A trong acceptFriends của B
            const existUserAInB = await User.findOne({
                _id: userId,
                acceptFriends: myUserId,
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
            console.log(myUserId);
            console.log(userId);
            // Xóa id của A trong acceptFriends của B
            //Thêm {user_id room_chat_id} của A vào frendList của B
            const existUserAInB = await User.findOne({
                _id: myUserId,
                acceptFriends: userId,
            });
            if (existUserAInB) {
                await User.updateOne(
                    {
                        _id: myUserId,
                    },
                    {   
                        $push: {
                            friendList: {
                              user_id: userId,
                              room_chat_id: ""
                            }
                          },
                        $pull: { acceptFriends: userId }
                    }
                );
            }

            // Xóa id của B trong requestFriends của A
            //Thêm {user_id room_chat_id} của B vào frendList của A
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
                        $push: {
                            friendList: {
                              user_id: myUserId,
                              room_chat_id: ""
                            }
                          },
                        $pull: { requestFriends: myUserId }
                    }
                );
            }
        });
    });
};
