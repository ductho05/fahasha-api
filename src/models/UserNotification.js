const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserNotification = new Schema(
    {
        isAccess: { type: Boolean, default: false },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        notification: { type: mongoose.Schema.Types.ObjectId, ref: "Notification" }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("UserNotification", UserNotification) 
