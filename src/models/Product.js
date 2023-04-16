const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Product = new Schema({
    title: String,
    author: String,
    published_date: String,
    publisher: String,
    price: Number,
    isbn: String,
    sold: Number,
    category: String,
    pages: Number,
    orderItem: {type: mongoose.Schema.Types.ObjectId, ref: "OrderItem"}
})

module.exports = mongoose.model("Product", Product)
