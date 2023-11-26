const Category = require("../models/Category");
const responeObject = require("../models/responeObject");
const CategoryService = require("../services/CategoryService")
const Response = require("../response/Response")

const resObj = new responeObject("", "", {});

class CategoryControllers {

  async getAllCategory(req, res) {

    const response = await CategoryService.getAll()

    res.status(response.statusCode).json(new Response(
      response.status,
      response.message,
      response.data
    ))
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

  // Thêm dữ liệu sách
  async addCategory(req, res) {
    try {
      const data = req.body

      if (data) {
        data.images = req.file.path
        await Category.create(data)
        resObj.status = "OK";
        resObj.message = "Add category successfully";
        resObj.data = data;
        return res.json(resObj);
      } else {
        resObj.status = "Failed";
        resObj.message = "Add category failed";
        resObj.data = {};
        return res.json(resObj);
      }
    } catch (err) {
      resObj.status = "Failed";
      resObj.message = `Error add data. Error: ${err}`;
      resObj.data = {};
      return res.json(resObj);
    }
  }

  // Sửa dữ liệu sách theo id
  async updateCategory(req, res) {
    try {
      const id = req.params.id
      const newCategory = { ...req.body }
      const filter = { _id: id }

      const file = req.file
      if (file) {
        newCategory.images = file.path
      }
      const update = newCategory
      const options = { new: true }

      await Category.findByIdAndUpdate(filter, update, options).exec()
      resObj.status = "OK";
      resObj.message = "Update category successfully";
      resObj.data = newCategory;
      return res.json(resObj);
    } catch (err) {
      resObj.status = "Failed";
      resObj.message = `Error update data. Error: ${err}`;
      resObj.data = {};
      return res.json(resObj);
    }
  }
}

module.exports = new CategoryControllers();
