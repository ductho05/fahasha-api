const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FlashUser = new Schema({
    userid: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
    flashid: { type: mongoose.Schema.Types.ObjectId, ref: "FlashSale" }, 
    mount: { type: Number, require: true, default: 1 }, // Số lượng đã bán
    buy_time: { type: String, require: true, default: new Date() }, // Ngày mua
},
// {
//   timestamps: true,
// }
)
    
module.exports = mongoose.model("FlashUser", FlashUser);
