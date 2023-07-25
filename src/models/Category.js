const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Category = new Schema({
  _id: { type: mongoose.Schema.Types.String },
  name: { type: String, require: true }, // Tên loại sách
  status: { type: String, require: true, default: "Hoạt dộng" }, // Trạng thái
  __v: { type: Number },
  field: {type: mongoose.Schema.Types.ObjectId, ref: 'Field'}
});

module.exports = mongoose.model("Category", Category)
