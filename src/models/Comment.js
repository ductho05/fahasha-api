const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = new Schema({
    content: { type: String, require: true }, 
    rate: { type: Number, require: true }, 
    status: { type: String, require: true, default: "Hiển thị" },
    userid: { type: mongoose.Schema.Types.ObjectId, require: true }, 
    productid: { type: mongoose.Schema.Types.ObjectId, require: true }, 
},{
    timestamps: true
})
    
module.exports = mongoose.model("Comment", Comment);
