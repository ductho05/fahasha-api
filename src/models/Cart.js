const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cart = new Schema ({
    total: {type:Number},
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"}

}, {
    timestamps: true,
})

Cart.index({name: "text", description: "text"})

module.exports = mongoose.model('Cart', Cart)