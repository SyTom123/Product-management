const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password:String,
    tokenUser: {
        type: String,
    },
    phone: String,
    avatar: String,
    acceptFriends: Array, // danh sách người đã gửi kết bạn cho mình
    requestFriends: Array, // danh sách người mình đã gửi kết bạn cho họ
    friendList: [
        {
            user_id: String,
            room_chat_id: String
        }
    ], // danh sách bạn bè
    deleted: {
        type: Boolean,
        default: false
    },
    statusOnline:String,
    status: {
        type: String,
        default: "active"
    },
    deletedAt: Date
}, {timestamps: true});

const User = mongoose.model("User", userSchema, "users");
module.exports = User;