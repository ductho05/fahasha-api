const Product = require("../models/Product");
const responeObject = require("../models/responeObject");

const resObj = new responeObject("", "", {});

class ProductControllers {
  // Lấy tất cả dữ liệu sách + phân trang + sắp theo giá
  async getAllProduct(req, res) {
    // Số trang
    var page = parseInt(req.query.page) || 1;
    // Số sản phẩm trên 1 trang
    var perPage = parseInt(req.query.perPage) || 10;
    // Tính số sản phẩm bỏ qua
    var start = (page - 1) * perPage;
    // Tính số sản phẩm lấy ra
    var end = perPage;
    // Sắp xếp giảm dần theo giá
    var sort = req.query.sort;

    try {
      const data = await Product.find()
        .populate("category")

        .sort({ price: sort })
        .skip(start)
        .limit(end)
        .exec(); // Thực thi
      if (data) {
        resObj.status = "OK";
        resObj.message = "Found product successfully";
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

  // Lấy dữ liệu sách theo id
  async getProductById(req, res) {
    try {
      const data = await Product.findById(req.params.id);
      if (data) {
        resObj.status = "OK";
        resObj.message = "Get product successfully";
        resObj.data = data;
        return res.json(resObj);
      } else {
        resObj.status = "Failed";
        resObj.message = "Not found product";
        resObj.data = {};
        return res.json(resObj);
      }
    } catch (err) {
      resObj.status = "Failed";
      resObj.message = `Error get data. Error: ${err}`;
      resObj.data = {};
      return res.json(resObj);
    }
  }

  // Lấy dữ liệu sách theo tên
  async getProductByName(req, res) {
    try {
      var title = req.params.title;
      const data = await Product.find({ title: new RegExp(title, "i") });
      if (data) {
        resObj.status = "OK";
        resObj.message = "Get product successfully";
        resObj.data = data;
        return res.json(resObj);
      } else {
        resObj.status = "Failed";
        resObj.message = "Not found product";
        resObj.data = {};
        return res.json(resObj);
      }
    } catch (err) {
      resObj.status = "Failed";
      resObj.message = `Error get data. Error: ${err}`;
      resObj.data = {};
      return res.json(resObj);
    }
  }

  // Lấy dữ liệu sách theo tác giả
  async getProductByAuthor(req, res) {
    try {
      var author = req.params.author;
      const data = await Product.find({ author: new RegExp(author, "i") });
      if (data) {
        resObj.status = "OK";
        resObj.message = "Get product successfully";
        resObj.data = data;
        return res.json(resObj);
      } else {
        resObj.status = "Failed";
        resObj.message = "Not found product";
        resObj.data = {};
        return res.json(resObj);
      }
    } catch (err) {
      resObj.status = "Failed";
      resObj.message = `Error get data. Error: ${err}`;
      resObj.data = {};
      return res.json(resObj);
    }
  }

  // Lấy dữ liệu sách theo khoảng năm xuất bản
  async getProductByYear(req, res) {
    try {
      var start = req.params.start;
      var end = req.params.end;
      const data = await Product.find({
        published_date: { $gte: start, $lte: end },
      });
      if (data) {
        resObj.status = "OK";
        resObj.message = "Get product successfully";
        resObj.data = data;
        return res.json(resObj);
      } else {
        resObj.status = "Failed";
        resObj.message = "Not found product";
        resObj.data = {};
        return res.json(resObj);
      }
    } catch (err) {
      resObj.status = "Failed";
      resObj.message = `Error get data. Error: ${err}`;
      resObj.data = {};
      return res.json(resObj);
    }
  }

  // Lấy sách mới nhất
  async getNewProduct(req, res) {
    try {
      var num = parseInt(req.params.num) || 8;
      const data = await Product.find()
        .sort({
          published_date: -1,
        })
        .limit(num);
      if (data) {
        resObj.status = "OK";
        resObj.message = "Get product successfully";
        resObj.data = data;
        return res.json(resObj);
      } else {
        resObj.status = "Failed";
        resObj.message = "Not found product";
        resObj.data = {};
        return res.json(resObj);
      }
    } catch (err) {
      resObj.status = "Failed";
      resObj.message = `Error get data. Error: ${err}`;
      resObj.data = {};
      return res.json(resObj);
    }
  }

  // Lấy sách rẻ nhất
  async getLowestProduct(req, res) {
    try {
      var num = parseInt(req.params.num) || 8;
      const data = await Product.find()
        .sort({
          price: 1,
        })
        .limit(num);
      if (data) {
        resObj.status = "OK";
        resObj.message = "Get product successfully";
        resObj.data = data;
        return res.json(resObj);
      } else {
        resObj.status = "Failed";
        resObj.message = "Not found product";
        resObj.data = {};
        return res.json(resObj);
      }
    } catch (err) {
      resObj.status = "Failed";
      resObj.message = `Error get data. Error: ${err}`;
      resObj.data = {};
      return res.json(resObj);
    }
  }

  // Lấy sách bán chạy nhất
  async getBestSellerProduct(req, res) {
    try {
      var num = parseInt(req.params.num) || 8;
      const data = await Product.find()
        .sort({
          sold: -1,
        })
        .limit(num);
      if (data) {
        resObj.status = "OK";
        resObj.message = "Get product successfully";
        resObj.data = data;
        return res.json(resObj);
      } else {
        resObj.status = "Failed";
        resObj.message = "Not found product";
        resObj.data = {};
        return res.json(resObj);
      }
    } catch (err) {
      resObj.status = "Failed";
      resObj.message = `Error get data. Error: ${err}`;
      resObj.data = {};
      return res.json(resObj);
    }
  }

  // Lấy dữ liệu sách theo khoảng giá và sắp xếp theo giá
  async getProductByPrice(req, res) {
    try {
      var start = req.params.start;
      var end = req.params.end;
      var sort = req.params.sort;
      const data = await Product.find({
        price: { $gte: start, $lte: end },
      }).sort({ price: sort });
      if (data) {
        resObj.status = "OK";
        resObj.message = "Get product successfully";
        resObj.data = data;
        return res.json(resObj);
      } else {
        resObj.status = "Failed";
        resObj.message = "Not found product";
        resObj.data = {};
        return res.json(resObj);
      }
    } catch (err) {
      resObj.status = "Failed";
      resObj.message = `Error get data. Error: ${err}`;
      resObj.data = {};
      return res.json(resObj);
    }
  }

  // Lấy sách theo danh mục
  async getProductByCategory(req, res) {
    try {
      var category = req.params.category;
      const data = await Product.find({
        category: category,
      });
      if (data) {
        resObj.status = "OK";
        resObj.message = "Get product successfully";
        resObj.data = data;
        return res.json(resObj);
      } else {
        resObj.status = "Failed";
        resObj.message = "Not found product";
        resObj.data = {};
        return res.json(resObj);
      }
    } catch (err) {
      resObj.status = "Failed";
      resObj.message = `Error get data. Error: ${err}`;
      resObj.data = {};
      return res.json(resObj);
    }
  }

  // Thêm dữ liệu sách
  async addProduct(req, res) {
    try {
      //   var product = new Product(req.body);
      //   const data = await product.save();
      const data = await Product.create(req.body);
      if (data) {
        resObj.status = "OK";
        resObj.message = "Add product successfully";
        resObj.data = data;
        return res.json(resObj);
      } else {
        resObj.status = "Failed";
        resObj.message = "Add product failed";
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
  async updateProduct(req, res) {
    try {
      const data = await Product.updateMany(
        { _id: req.params.id },
        {
          $set: {
            title: req.body.title,
            author: req.body.author,
            published_date: req.body.published_date,
            price: req.body.price,
            isbn: req.body.isbn,
            publisher: req.body.publisher,
            pages: req.body.pages,
          },
        }
      );
      if (data) {
        resObj.status = "OK";
        resObj.message = "Update product successfully";
        resObj.data = data;
        return res.json(resObj);
      } else {
        resObj.status = "Failed";
        resObj.message = "Update product failed";
        resObj.data = {};
        return res.json(resObj);
      }
    } catch (err) {
      resObj.status = "Failed";
      resObj.message = `Error update data. Error: ${err}`;
      resObj.data = {};
      return res.json(resObj);
    }
  }

  // Xóa dữ liệu sách theo id
  async deleteProduct(req, res) {
    try {
      const data = await Product.deleteOne({ _id: req.params.id });
      if (data) {
        resObj.status = "OK";
        resObj.message = "Delete product successfully";
        resObj.data = data;
        return res.json(resObj);
      } else {
        resObj.status = "Failed";
        resObj.message = "Delete product failed";
        resObj.data = {};
        return res.json(resObj);
      }
    } catch (err) {
      resObj.status = "Failed";
      resObj.message = `Error delete data. Error: ${err}`;
      resObj.data = {};
      return res.json(resObj);
    }
  }
}

module.exports = new ProductControllers();
=======
const Product = require("../models/Product")
const responeObject = require("../models/responeObject")

const resObj = new responeObject("", "", {})

class ProductControllers {

    // Lấy tất cả dữ liệu sách + phân trang + sắp theo giá
    async getAllProduct(req, res) {
        // Số trang
        var page = parseInt(req.query.page) || 1;
        // Số sản phẩm trên 1 trang
        var perPage = parseInt(req.query.perPage) || 10;
        // Tính số sản phẩm bỏ qua
        var start = (page - 1) * perPage;
        // Tính số sản phẩm lấy ra
        var end = perPage;
        // Sắp xếp giảm dần theo giá
        var sort = req.query.sort;
       
        try {
            const data = await Product
            .find()
            .sort({price: sort})
            .skip(start)
            .limit(end);
            if (data) {
                resObj.status = "OK"
                resObj.message = "Found product successfully"
                resObj.data = data
                res.json(resObj)
            } else {
                resObj.status = "Failed"
                resObj.message = "Not found data"
                resObj.data = ""
                res.json(resObj)
            }
        } catch (err) {
            resObj.status = "Failed"
            resObj.message = "Error when get data"
            resObj.data = ""
            res.json(resObj)
        }
    }

    async getProductById(req, res) {
        try {
            const data = await bookModel.findById(req.params.id);
            if (data) {
                resObj.status = "OK"
                resObj.message = "Get product successfully"
                resObj.data = data
                return res.json(resObj);
            } else {
                resObj.status = "Failed"
                resObj.message = "Not found product"
                resObj.data = {}
                return res.json(resObj);
            }
        } catch (err) {
            resObj.status = "Failed"
            resObj.message = `Error get data. Error: ${err}`
            resObj.data = {}
            return res.json(resObj);
        }
    }
}

module.exports = new ProductControllers
