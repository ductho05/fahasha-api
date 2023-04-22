var express = require("express");
var router = express.Router();
// var path = require("path");
const bookModel = require("../models/bookmodel");

// Lấy tất cả dữ liệu sách + phân trang + sắp theo giá
router.get("/", async function (req, res) {
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
    const data = await bookModel
      .find()
      .sort(sort ? { price: sort } : {})
      .skip(start)
      .limit(end);
    if (data) {
      return res.send(data);
    } else {
      console.log("Không tìm thấy dữ liệu");
      return res.status(404).send("Không tìm thấy dữ liệu");
    }
  } catch (err) {
    console.log("Lỗi khi lấy dữ liệu: ", err);
    return res.status(500).send("Lỗi khi lấy dữ liệu");
  }
});

// Lấy dữ liệu sách theo id
router.get("/:id", async function (req, res) {
  try {
    const data = await bookModel.findById(req.params.id);
    if (data) {
      //localStorage.setItem("mybook", JSON.stringify(data.$category));
      return res.send(data);
    } else {
      console.log("Không tìm thấy dữ liệu");
      return res.status(404).send("Không tìm thấy dữ liệu");
    }
  } catch (err) {
    console.log("Lỗi khi lấy dữ liệu: ", err);
    return res.status(500).send("Lỗi khi lấy dữ liệu");
  }
});

// Lấy dữ liệu sách theo tên
router.get("/title/:title", async function (req, res) {
  try {
    var title = req.params.title;
    const data = await bookModel.findBytitle(title);
    if (data) {
      return res.send(data);
    } else {
      console.log("Không tìm thấy dữ liệu");
      return res.status(404).send("Không tìm thấy dữ liệu");
    }
  } catch (err) {
    console.log("Lỗi khi lấy dữ liệu: ", err);
    return res.status(500).send("Lỗi khi lấy dữ liệu");
  }
});

// Lấy dữ liệu sách theo tác giả
router.get("/author/:author", async function (req, res) {
  try {
    var author = req.params.author;
    const data = await bookModel.find({ author: new RegExp(author, "i") });
    if (data) {
      return res.send(data);
    } else {
      console.log("Không tìm thấy dữ liệu");
      return res.status(404).send("Không tìm thấy dữ liệu");
    }
  } catch (err) {
    console.log("Lỗi khi lấy dữ liệu: ", err);
    return res.status(500).send("Lỗi khi lấy dữ liệu");
  }
});

// Lấy dữ liệu sách theo khoảng năm xuất bản
router.get("/published_date/:start/:end", async function (req, res) {
  try {
    var start = req.params.start;
    var end = req.params.end;
    const data = await bookModel.find({
      published_date: { $gte: start, $lte: end },
    });
    if (data) {
      return res.send(data);
    } else {
      console.log("Không tìm thấy dữ liệu");
      return res.status(404).send("Không tìm thấy dữ liệu");
    }
  } catch (err) {
    console.log("Lỗi khi lấy dữ liệu: ", err);
    return res.status(500).send("Lỗi khi lấy dữ liệu");
  }
});

// Lấy sách mới nhất
router.get("/new/:num", async function (req, res) {
  var num = parseInt(req.params.num) || 8;
  try {
    const data = await bookModel.find().sort({ published_date: -1 }).limit(num);
    if (data) {
      return res.send(data);
    } else {
      console.log("Không tìm thấy dữ liệu");
      return res.status(404).send("Không tìm thấy dữ liệu");
    }
  } catch (err) {
    console.log("Lỗi khi lấy dữ liệu: ", err);
    return res.status(500).send("Lỗi khi lấy dữ liệu");
  }
});

// Lấy sách rẻ nhất
router.get("/sale/:num", async function (req, res) {
  var num = parseInt(req.params.num) || 8;
  try {
    const data = await bookModel.find().sort({ price: 1 }).limit(num);
    if (data) {
      return res.send(data);
    } else {
      console.log("Không tìm thấy dữ liệu");
      return res.status(404).send("Không tìm thấy dữ liệu");
    }
  } catch (err) {
    console.log("Lỗi khi lấy dữ liệu: ", err);
    return res.status(500).send("Lỗi khi lấy dữ liệu");
  }
});

// Lấy sách bán chạy
router.get("/bestseller/:num", async function (req, res) {
  var num = parseInt(req.params.num) || 8;
  try {
    const data = await bookModel.find().sort({ sold: -1 }).limit(num);
    if (data) {
      return res.send(data);
    } else {
      console.log("Không tìm thấy dữ liệu");
      return res.status(404).send("Không tìm thấy dữ liệu");
    }
  } catch (err) {
    console.log("Lỗi khi lấy dữ liệu: ", err);
    return res.status(500).send("Lỗi khi lấy dữ liệu");
  }
});



// Lấy dữ liệu sách theo khoảng giá và sắp xếp theo giá
router.get("/price/:start/:end/:sort", async function (req, res) {
  try {
    var start = req.params.start;
    var end = req.params.end;
    var sort = req.params.sort;
    const data = await bookModel
      .find({ price: { $gte: start, $lte: end } })
      .sort({ price: sort });
    if (data) {
      return res.send(data);
    } else {
      console.log("Không tìm thấy dữ liệu");
      return res.status(404).send("Không tìm thấy dữ liệu");
    }
  } catch (err) {
    console.log("Lỗi khi lấy dữ liệu: ", err);
    return res.status(500).send("Lỗi khi lấy dữ liệu");
  }
});

// Thêm dữ liệu sách
router.post("/add", async function (req, res) {
  try {
    const data = await bookModel.create(req.body);
    if (data) {
      return res.send(data);
    } else {
      console.log("Không thể thêm dữ liệu");
      return res.status(404).send("Không thể thêm dữ liệu");
    }
  } catch (err) {
    console.log("Lỗi khi thêm dữ liệu: ", err);
    return res.status(500).send("Lỗi khi thêm dữ liệu");
  }
});

// Sửa dữ liệu sách theo id
router.post("/update/:id", async function (req, res) {
  console.log(req.params.id);
  try {
    console.log(req.body);
    const data = await bookModel.updateMany(
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
      return res.send(data);
    } else {
      console.log("Không thể thêm dữ liệu");
      return res.status(404).send("Không thể thêm dữ liệu");
    }
  } catch (err) {
    console.log("Lỗi khi thêm dữ liệu: ", err);
    return res.status(500).send("Lỗi khi thêm dữ liệu");
  }
});

// Xóa dữ liệu sách theo id
router.get("/delete/:id", async function (req, res) {
  try {
    const data = await bookModel.deleteOne({ _id: req.params.id });
    if (data) {
      return res.send(data);
    } else {
      console.log("Không thể xóa dữ liệu");
      return res.status(404).send("Không thể xóa dữ liệu");
    }
  } catch (err) {
    console.log("Lỗi khi xóa dữ liệu: ", err);
    return res.status(500).send("Lỗi khi xóa dữ liệu");
  }
});

module.exports = router;
