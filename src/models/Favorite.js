const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Favorite = new Schema({
    userid: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
    productid: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, 
},{
    timestamps: true
})
    
module.exports = mongoose.model("Favorite", Favorite);
