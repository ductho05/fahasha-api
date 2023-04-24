const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartItem = new Schema ({
    quantity: {type:Number},
    product: {type: mongoose.Schema.Types.ObjectId, ref: "Product"},
    

}, {
    timestamps: true,
})

CartItem.index({name: "text", description: "text"})

module.exports = mongoose.model('CartItem', CartItem)