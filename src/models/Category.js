const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Category = new Schema({
  name: { type: String, require: true }, // Tên sách
  tag: { type: String, require: true }, // Thẻ
  description: { type: String, require: true }, // Mô tả
  status: { type: String, require: true, default: "Hoạt dộng" }, // Trạng thái
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
});
const categorymodel = mongoose.model("Category", Category);
categorymodel.create(
    {
      name: "The Old Man and the Sea",
      tag: "Ernest Hemingway",
      description: "1952-09-01",
      status: "Hoạt dộng",
    },
);

module.exports = categorymodel
