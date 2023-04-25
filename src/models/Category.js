const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Category = new Schema({
  name: { type: String, require: true }, // Tên loại sách
  images: { type: String}, // link ảnh
  status: { type: String, require: true, default: "Hoạt dộng" }, // Trạng thái
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
}, {
  timestamps: true
});

module.exports = mongoose.model("Category", Category)
