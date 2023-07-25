const { Int, Float } = require("mssql");
const Product = require("../models/Product");
const Category = require("../models/Category");
const responeObject = require("../models/responeObject");

const resObj = new responeObject("", "", {});

class ProductControllers {
  // Lấy tất cả dữ liệu sách + phân trang + sắp theo giá
  async getAllProduct(req, res) {
    // Category
    var category = req.query.category;

    // Tên sách
    var title = req.query.title;

    // Số trang
    var page = parseInt(req.query.page);
    // Số sản phẩm trên 1 trang
    var perPage = parseInt(req.query.perPage);
    // Tính số sản phẩm bỏ qua
    var start = (page - 1) * perPage;
    // Tính số sản phẩm lấy ra
    var end = perPage;

    // Sắp xếp
    var sort = req.query.sort;

    // Sắp xếp theo trường nào đó
    var filter = req.query.filter;

    // Lấy num sản phẩm thôi
    var num = req.query.num;

    try {
      const data = await Product.find(category ? { categoryId: category } : {})
        .find(title ? { title: new RegExp(title, "i") } : {})
        .populate("categoryId")
        .skip(start)
        .limit(end)
        .exec();
      if (sort) {
        if (filter == "price") {
          data.sort(function (a, b) {
            if (sort == "asc") {
              return a.price - b.price;
            }
            if (sort == "desc") {
              return b.price - a.price;
            }
          });
        }
        if (filter == "sold") {
          data.sort(function (a, b) {
            if (sort == "asc") {
              return a.sold - b.sold;
            }
            if (sort == "desc") {
              return b.sold - a.sold;
            }
          });
        }
        if (filter == "rate") {
          data.sort(function (a, b) {
            if (sort == "asc") {
              return a.rate - b.rate;
            }
            if (sort == "desc") {
              return b.rate - a.rate;
            }
          });
        }
        if (filter == "published_date") {
          data.sort(function (a, b) {
            let dateA = new Date(a.published_date);
            let dateB = new Date(b.published_date);
            if (sort == "asc") {
              return dateA - dateB;
            }
            if (sort == "desc") {
              return dateB - dateA;
            }
          });
        }
        if (filter == "title") {
          data.sort(function (a, b) {
            if (sort == "asc") {
              return a.title - b.title;
            }
            if (sort == "desc") {
              return b.title - a.title;
            }
          });
        }
        if (filter == "author") {
          data.sort(function (a, b) {
            if (sort == "asc") {
              return a.author - b.author;
            }
            if (sort == "desc") {
              return b.author - a.author;
            }
          });
        }
        if (filter == "status") {
          data.sort(function (a, b) {
            if (sort == "asc") {
              return a.status - b.status;
            }
            if (sort == "desc") {
              return b.status - a.status;
            }
          });
        }
        if (filter == "discount") {
          data.sort(function (a, b) {
            let discountA = a.old_price / a.price;
            let discountB = b.old_price / b.price;
            if (sort == "asc") {
              return discountA - discountB;
            }
            if (sort == "desc") {
              return discountB - discountA;
            }
          });
        }
      }

      // Lấy num sản phẩm thôi
      if (num > 0) {
        data.splice(num);
      }

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
      resObj.message = "Error when get data" + err;
      resObj.data = "";
      res.json(resObj);
    }
  }

  // Đếm số lượng sản phẩm theo category
  async getCountProduct(req, res) {
    try {
      var id = req.query.category;
      let data
      if (id == '') {
        data = await Product.count()
      } else {
        data = await Product.count({categoryId: id})
      }
      if (data) {
        resObj.status = "OK";
        resObj.message = "Count product successfully";
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

  // Lấy 6 sản phẩm được bán chạy nhất
  async getProductBestSellerLimit(req, res) {
    try {
      const data = await Product.find()

      const newData = data.sort((a, b) => b.sold - a.sold).splice(0, 6)
      if (data) {
        resObj.status = "OK";
        resObj.message = "Get product successfully";
        resObj.data = newData;
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

  // Lấy dữ liệu sách theo id
  async getProductById(req, res) {
    try {
      const data = await Product.findById(req.params.id)
        .populate("categoryId")
        .exec();
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

  // Tìm 5 category co nhiều sản phẩm nhất
  async getNumProductByCategory(req, res) {
    try {
      const data = await Product.aggregate([
        {
          $group: {
            _id: "$categoryId",
            
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 5 },
      ]);
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


  // Tìm tổng số sản phẩm có rate bằng 5
  async getNumProductByRate(req, res) {
    try {
      const data = await Product.aggregate([
        {
          $group: {
            _id: "$rate",
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: -1 } },    
      ]);
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
      var num = parseInt(req.query.num) || 6;
      const data = await Product.find({ title: new RegExp(title, "i") })
        .populate("categoryId")
        .limit(num)
        .exec();
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
      const data = await Product.find({
        author: new RegExp(author, "i"),
      }).populate("categoryId");
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
      }).populate("categoryId");
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
        .populate("categoryId")
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
        .populate("categoryId")
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

  // Lấy sách giảm sốc
  async getLowestProduct(req, res) {
    try {
      var num = parseInt(req.params.num) || 8;
      const data = await Product.find()
        .sort({
          price: -1,
        })
        .populate("categoryId")
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
        .populate("categoryId")
        .sort({
          sold: -1,
        })
        .limit(num)
        .exec(); // Thực thi
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
      })
        .sort({ price: sort })
        .populate("categoryId");
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

  //Tìm các sách có tên danh mục là "Sách giáo khoa"
  async getProductByCategoryName(req, res) {
    try {
      const category = await Category.findOne({
        name: "Lịch Sử Thế Giới",
      }).populate("categoryId");

      const data = await Product.find({
        "category.name": category.name,
      });
      console.log(data);
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
      var limit = req.query.limit || 0;
      var id = req.query.category;
      const data = await Product.find({ categoryId: id })
        .limit(limit)
        .populate("categoryId")
        .exec();
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
      const data = await Product.create(req.body).populate("categoryId");
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
