const Order = require("../models/Order");
const responeObject = require("../models/responeObject");
const moment = require('moment-timezone');
var resObj = new responeObject("", "", {});
class OrderController {

  async getAllOrderByUser(req, res) {
    try {
      const { user } = req.body
      if (user) {
        const listOrder = await Order.find({ user: user })
          .sort({ updatedAt: -1 })
          .limit(10)
          .exec()
        resObj.status = "OK"
        resObj.message = "Found orders successfully"
        resObj.data = listOrder
        res.json(resObj)
      } else {
        resObj.status = "Error"
        resObj.message = "user is empty"
        resObj.data = []
        res.json(resObj)
      }
    } catch (err) {
      resObj.status = "Error"
      resObj.message = err.message
      resObj.data = []
      res.json(resObj)
    }
  }

  // Lấy tổng số lượng đơn hàng theo cả 5 trạng thái

  async getTotalOrderByStatus(req, res) {
    try {
      const total = await Order.aggregate([
        {
          $group: {
            status: "DAGIAO",
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
      ]);
      resObj.status = "OK";
      resObj.message = "Found orders successfully";
      resObj.data = total;
      res.status(200);
      res.json(resObj);
    } catch (error) {
      resObj.status = "Failed";
      resObj.message = error.message;
      resObj.data = "";
      res.status(500);
      res.json(resObj);
    }
  }


  // Lấy đơn hàng theo trạng thái đơn hàng
  async getAllOrderByStatus(req, res) {
    const page = req.query.page;
    const limit = req.query.limit;
    const status = req.query.status;
    const user = req.query.user;



    try {
      if (user) {
        const orderList = await Order.find({ user: user, status: new RegExp(status, "i") })
          .populate("user")
          .sort({ updatedAt: -1 })
          .skip((page - 1) * limit)
          .limit(limit);

        resObj.status = "OK";
        resObj.message = "Found orders successfully";
        resObj.data = orderList;
        res.status(200);
        res.json(resObj);
      } else {
        const orderList = await Order.find({ status: new RegExp(status, "i") })
          .populate("user")
          .sort({ updatedAt: -1 })
          .skip((page - 1) * limit)
          .limit(limit);

        resObj.status = "OK";
        resObj.message = "Found orders successfully";
        resObj.data = orderList;
        res.status(200);
        res.json(resObj);
      }
    } catch (error) {
      resObj.status = "Failed";
      resObj.message = error.message;
      resObj.data = "";
      res.status(500);
      res.json(resObj);
    }
  }

  // Lấy đơn hàng theo phân trang
  async getAllOrderPaginaion(req, res) {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const user = req.query.user

    try {
      const orderList = await Order.find({ user: user })
        .sort({ updatedAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
      resObj.status = "OK";
      resObj.message = "Found orders successfully";
      resObj.data = orderList;
      res.status(200);
      res.json(resObj);
    } catch (error) {
      resObj.status = "Failed";
      resObj.message = error.message;
      resObj.data = "";
      res.status(500);
      res.json(resObj);
    }
  }

  // Lấy tất cả đơn hàng theo thời gian tạo đơn hàng
  async getAllOrderByTime(req, res) {
    const page = req.query.page;
    const limit = req.query.limit;
    const firstTime = req.query.ftime;
    const lastTime = req.query.ltime;
    try {
      const orderList = await Order.find({
        createdAt: { $gte: firstTime, $lte: lastTime },
      })
        .sort({ updatedAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

      resObj.status = "OK";
      resObj.message = "Found orders successfully";
      resObj.data = orderList;
      res.status(200);
      res.json(resObj);
    } catch (error) {
      resObj.status = "Failed";
      resObj.message = error.message;
      resObj.data = "";
      res.status(500);
      res.json(resObj);
    }
  }

  // Tìm kiếm đơn hàng theo tên
  async getAllOrderByName(req, res) {
    const name = req.query.name;
    const page = req.query.page;
    const limit = req.query.limit;

    try {
      const orderList = await Order.find({
        $text: {
          $search: name,
          $caseSensitive: false,
          $diacriticSensitive: false,
        },
      })
        .sort({ updatedAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

      resObj.status = "Ok";
      resObj.message = "Found orders successfully";
      resObj.data = orderList;

      res.status(200);
      res.json(resObj);
    } catch (error) {
      resObj.status = "Failed";
      resObj.message = error.message;
      resObj.data = "";
      res.status(500);
      res.json(resObj);
    }
  }

  // // Lấy tất cả các đơn hàng
  // async getAllOrders(req, res) {
  //     var page = req.query.page;
  //     var limit = req.query.limit;
  //     var status = req.query.status;
  //     var name = req.query.name;
  //     var firstTime = req.query.ftime;
  //     var lastTime = req.query.ltime;
  //     var sort = req.query.sort;
  //     var user = req.query.user;
  //     try {
  //       const data = await Order.find(
  //         status ? { status: new RegExp(status, "i") } : {}
  //       )
  //         .find(user ? { user: user } : {})
  //         .sort(sort ? { updatedAt: sort } : {}).populate("user").exec();

  //       if (data) {
  //         resObj.status = "OK";
  //         resObj.message = "Found product successfully";
  //         resObj.data = data;
  //         res.json(resObj);
  //       } else {
  //         resObj.status = "Failed";
  //         resObj.message = "Not found data";
  //         resObj.data = "";
  //         res.json(resObj);
  //       }
  //     } catch (err) {
  //       resObj.status = "Failed";
  //       resObj.message = "Error when get data" + err;
  //       resObj.data = "";
  //       res.json(resObj);
  //     }
  //   }

  // Lấy tất cả các đơn hàng
  async getAllOrders(req, res) {
    var page = req.query.page;
    var limit = req.query.limit;
    var status = req.query.status;
    var name = req.query.name;
    var firstTime = req.query.ftime;
    var lastTime = req.query.ltime;
    var sort = req.query.sort;
    var user = req.query.user;
    try {
      const data = await Order.find(
        status ? { status: new RegExp(status, "i") } : {}
      )
        .find(user ? { user: user } : {})
        .sort(sort ? { updatedAt: sort } : {}).limit(limit).populate("user").exec();

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

  // Lấy 1 đơn hàng theo id
  async getOrderById(req, res) {
    try {
      var id = req.params.id;
      const order = await Order.findOne({ _id: id }).exec();

      if (order) {
        resObj.status = "OK";
        resObj.message = "Found order successfully";
        resObj.data = order;

        res.status(200);
        res.json(resObj);
      } else {
        resObj.status = "OK";
        resObj.message = "Not found order";
        resObj.data = "";

        res.status(404);
        res.json(resObj);
      }
    } catch (error) {
      resObj.status = "Failed";
      resObj.message = error.message;
      resObj.data = "";

      res.status(500);
      res.json(resObj);
    }
  }

  // Thêm mới 1 đơn hàng
  async insertOrder(req, res) {
    try {
         // Đặt múi giờ cho Việt Nam
      const vietnamTimeZone = 'Asia/Ho_Chi_Minh';
      // Lấy thời gian hiện tại ở Việt Nam
      const currentTimeInVietnam = moment().tz(vietnamTimeZone);
      const date =  currentTimeInVietnam.format('YYYY-MM-DD HH:mm:ss');
      const order = new Order({ ...req.body });
      order.date = date;
      await order.save();
      if (
        order.address.trim() == "" ||
        order.city.trim() == "" ||
        order.name.trim() == "" ||
        order.phone.trim() == "" ||
        order.quantity == "" ||
        order.price == ""
      ) {
        resObj.status = "Failed";
        resObj.message = "Records is null";
        resObj.data = "";

        res.json(resObj);
      } else {
        resObj.status = "OK";
        resObj.message = "Insert order successfully";
        resObj.data = order;

        order.save();
        res.json(resObj);
      }
    } catch (error) {
      resObj.status = "Failed";
      resObj.message = error.message;
      resObj.data = "";

      res.status(500);
      res.json(resObj);
    }
  }

  // Xóa một đơn hàng
  async removeOrder(req, res) {
    try {
      const id = req.params.id;
      const order = await Order.findByIdAndRemove({ _id: id }).exec();

      if (order) {
        resObj.status = "OK";
        resObj.message = "Remove order successfully";
        resObj.data = `order id: ${id}`;
        res.status(200);
        res.json(resObj);
      } else {
        resObj.status = "Failed";
        resObj.message = "Not found order";
        resObj.data = "";

        res.status(404);
        res.json(resObj);
      }
    } catch (error) {
      resObj.status = "Failed";
      resObj.message = error.message;
      resObj.data = "";

      res.status(500);
      res.json(resObj);
    }
  }

  // Cập nhật một đơn hàng
  async updateOrder(req, res) {
    try {
      const id = req.params.id;
      const newOrder = { ...req.body };
      const filter = { _id: id };
      const update = newOrder;
      const options = { new: true };
      const order = await Order.findByIdAndUpdate(filter, update, options).exec();

      resObj.status = "OK";
      resObj.message = "Update successfully";
      resObj.data = order;

      res.status(200);
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

module.exports = new OrderController();
