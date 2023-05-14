const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartItem = new Schema ({
    quantity: {type:Number},
    product: {type: mongoose.Schema.Types.ObjectId, ref: "Product"},
    cart: {type: mongoose.Schema.Types.ObjectId, ref: "Cart"}

}, {
    timestamps: true,
})

CartItem.index({name: "text", description: "text"})

module.exports = mongoose.model('CartItem', CartItem)