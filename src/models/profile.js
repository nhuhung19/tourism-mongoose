const mongoose = require("mongoose")
const validator = require("validator")

const schema = mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    phone: {
        type: Number,
        required: [true, "phone number is required"],
        minLength: 10
    },
    address: {
        type: String,
        required: [true, "address is required"]
    },
    introduce: {
        type: String,
        required: [true, "introduce is required"]
    }
})

const Profile = mongoose.model("Profile", schema)

module.exports = Profile