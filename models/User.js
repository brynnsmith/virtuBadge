const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    linkedIn: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("User", UserSchema);