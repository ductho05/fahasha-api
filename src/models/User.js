const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema ({
    name: { type: String, minLength: 1, maxLength: 100 },
    address: { type: String, minLength: 1, maxLength: 255 },
    city: { type: String, minLength: 1, maxLength: 100 },
    phone: { type: String, minLength: 1, maxLength: 14 },
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order"}
})

module.exports = mongoose.model('User', User)
