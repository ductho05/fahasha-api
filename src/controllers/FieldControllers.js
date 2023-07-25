const Field = require("../models/Field");
const responeObject = require("../models/responeObject");

const resObj = new responeObject("", "", {});

class FieldControllers {
  // Lấy tất cả category
  async getAllField(req, res) {
    try {
      const data = await Field.find();
      if (data) {
        resObj.status = "OK";
        resObj.message = "Found field successfully";
        resObj.data = data;
        res.json(resObj);
      } else {
        resObj.status = "Failed";
        resObj.message = "Not found data";
        resObj.data = "";
        res.json(resObj);
      }
    } catch (err) {
      resObj.status = "Failed";
      resObj.message = "Error when get data";
      resObj.data = "";
      res.json(resObj);
    }
  }

  // Thêm mới 1 đơn hàng
  async insertField(req, res) {
    try {
      const field = new Field({ ...req.body });
      resObj.status = "OK";
      resObj.message = "Insert field successfully";
      resObj.data = field;

      field.save();
      res.json(resObj);
    } catch (error) {
      resObj.status = "Failed";
      resObj.message = error.message;
      resObj.data = "";

      res.status(500);
      res.json(resObj);
    }
  }
}

module.exports = new FieldControllers();
