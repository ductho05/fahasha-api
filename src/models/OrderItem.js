const mongoose = require("mongoose")
const Schema = mongoose.Schema

const OrderItem = new Schema ({
    quantity: {type: Number, default: 1},
    price: {type: Number, require: true},
    order: {type: mongoose.Schema.Types.ObjectId, ref: "Order", require: true},
    product: {type: mongoose.Schema.Types.ObjectId, ref: "Product", require: true}
})

module.exports = mongoose.model("OrderItem", OrderItem)
