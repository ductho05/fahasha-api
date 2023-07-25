const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Field = new Schema({
  name: { type: String, require: true }, 
  status: { type: String, require: true, default: "Hoạt dộng" },
  category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'}
});

module.exports = mongoose.model("Field", Field)