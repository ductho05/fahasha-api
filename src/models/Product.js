const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product = new Schema({
    title: { type: String, require: true }, // Tên sách
    author: { type: String, require: true }, // Tác giả
    published_date: { type: String }, // Năm xuất bản
    // publisher: { type: String }, // Nhà xuất bản
    price: { type: Number, require: true }, // Giá bán
    old_price: { type: Number, require: true }, // Giá cũ
    // isbn: { type: String }, // Mã ISBN
    rate: { type: Number }, // Đánh giá
    sold: { type: Number }, // Số lượng đã bán
    description: { type: String, require: true }, // Mô tả
    // discount: { type: Number }, // Giảm giá
    status: { type: String, require: true, default: "Còn hàng" }, // Trạng thái
    // pages: { type: String }, // Số trang
    images: { type: String }, // Đường dẫn ảnh
    categoryId: { type: mongoose.Schema.Types.String, ref: "Category" },
    //orderItem: { type: mongoose.Schema.Types.ObjectId, ref: "OrderItem" },
});
    
module.exports = mongoose.model("Product", Product);
