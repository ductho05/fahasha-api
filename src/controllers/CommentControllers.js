const Comment = require("../models/Comment");
const responeObject = require("../models/responeObject");

const resObj = new responeObject("", "", {});

class CommentControllers {
  async getAllComment(req, res) {
    var rate = req.query.rate;
    var productId = req.query.productId;
    var page = req.query.page;
    var perPage = req.query.perPage;
    var sort = req.query.sort;
    var skip = (page - 1) * perPage;
    var limit = perPage * 1;

    try {
      const data = await Comment.find(productId ?
         { productId: productId } : {}).find(rate ? { rate: rate } : {})
        .sort(sort ? { createdAt: sort } : {}).skip(skip).limit(limit).exec();
      if (data) {
        resObj.status = "OK";
        resObj.message = "Found comment successfully";
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

  async getCommentById(req, res) {
    try {
      const data = await Comment.findById(req.params.id);
      if (data) {
        resObj.status = "OK";
        resObj.message = "Found comment successfully";
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

  async addComment(req, res) {
    try {
      const data = req.body
      if (data) {
        await Comment.create(data)
        resObj.status = "OK";
        resObj.message = "Add comment successfully";
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
      resObj.message = "Error when add data";
      resObj.data = "";
      res.json(resObj);
    }
  }

  // Xóa comment, ẩn đi
  async deleteComment(req, res) {
    try {
      const data = await Comment.findByIdAndDelete(req.params.id);
      if (data) {
        resObj.status = "OK";
        resObj.message = "Delete comment successfully";
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
      resObj.message = "Error when delete data";
      resObj.data = "";
      res.json(resObj);
    }
  }
}

module.exports = new CommentControllers();