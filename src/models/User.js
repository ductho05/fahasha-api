const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema ({
    isManager: {type: Boolean, default:false},
    username: { type: String, require: true},
    password: { type: String, require: true},
    fullName: { type: String, default: ""},
    images: { type: String, default: ""},
    gender: { type: String, default: ""},
    email: { type: String, require: true},
    address: { type: String, default: ""},
    city: { type: String, default: ""},
    phoneNumber: { type: String, default: ""},
    birth: { type: Date, default: null},
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order"},
    cart: {type: mongoose.Schema.Types.ObjectId, ref: "Cart"}
},{
    timestamps: true
})

module.exports = mongoose.model('User', User)
