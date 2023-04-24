const Category = require("../models/Category");
const responeObject = require("../models/responeObject");

const resObj = new responeObject("", "", {});

class CategoryControllers {
  // Lấy tất cả category
  async getAllCategory(req, res) {
    try {
      const data = await Category.find();
      if (data) {
        resObj.status = "OK";
        resObj.message = "Found category successfully";
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

  // Lấy category theo id
  async getCategoryById(req, res) {
    try {
      const data = await Category.findById(req.params.id);
      if (data) {
        resObj.status = "OK";
        resObj.message = "Found category successfully";
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
}

module.exports = new CategoryControllers();
