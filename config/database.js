const mongoose = require("mongoose");
module.exports.connect =async () => {
    try {
        await mongoose.connect(process.env.MONG0_URL)
        console.log("Connect database sussessfully")
    } catch (error) {
        console.log("Connect database error")
    }
}