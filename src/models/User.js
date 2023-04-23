const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema ({
    isManager: {type: Boolean, default:false},
    userName: { type: String, minLength: 1, maxLength: 100 },
    passWord: { type: String, minLength: 1, maxLength: 100 },
    fullName: { type: String, minLength: 1, maxLength: 100 },
    image: { type: String, minLength: 1, maxLength: 100 },
    gender: { type: String, minLength: 1, maxLength: 4 },
    email: { type: String, minLength: 1, maxLength: 100 },
    address: { type: String, minLength: 1, maxLength: 255 },
    city: { type: String, minLength: 1, maxLength: 100 },
    phoneNumber: { type: String, minLength: 1, maxLength: 14 },
    birth: { type: Date},
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order"}
})

module.exports = mongoose.model('User', User)
