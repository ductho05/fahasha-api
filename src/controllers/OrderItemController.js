const OrderItem = require("../models/OrderItem");
const responeObject = require("../models/responeObject");
const resObj = new responeObject("", "", {});
const Product = require("../models/Product");

class OrderItemController {
  async getAllOrderItem(req, res) {
    try {
      const orderItemList = await OrderItem.find()
        .populate("order")
        .populate("product")
        .exec();

      (resObj.status = "OK"), (resObj.message = "Found order successfully !");
      resObj.data = orderItemList;
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

  async getAllOrderItemByOrder(req, res) {
    try {
      const id = req.query.id;
      const orderItemList = await OrderItem.find({ order: id })
        .populate("order")
        .populate({
          path: "product",
          populate: {
            path: "categoryId",
            model: "Category",
          },
        })
        .exec();

      (resObj.status = "OK"), (resObj.message = "Found order successfully !");
      resObj.data = orderItemList;
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

  async getOrderItemById(req, res) {
    try {
      var id = req.params.id;
      const orderItem = await OrderItem.findOne({ _id: id })
        .populate("order")
        .populate("product")
        .exec();
      if (orderItem) {
        resObj.status = "OK";
        resObj.message = "Found order successfully";
        resObj.data = orderItem;

        res.status(200);
        res.json(resObj);
      } else {
        resObj.status = "OK";
        resObj.message = "Not found order item";
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

  async insertOrderItem(req, res) {
    try {
      const orderItem = new OrderItem({ ...req.body });
      if (orderItem.quantity == "" || orderItem.price == "") {
        resObj.status = "Failed";
        resObj.message = "Records is null";
        resObj.data = "";

        res.json(resObj);
      } else {
        resObj.status = "OK";
        resObj.message = "Insert orderItem item successfully";
        resObj.data = orderItem;

        orderItem.save();
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

  async removeOrderItem(req, res) {
    try {
      const id = req.params.id;
      const orderItem = await OrderItem.findByIdAndRemove({ _id: id }).exec();

      if (orderItem) {
        resObj.status = "OK";
        resObj.message = "Remove orderItem successfully";
        resObj.data = `orderItem id: ${id}`;
        res.status(200);
        res.json(resObj);
      } else {
        resObj.status = "Failed";
        resObj.message = "Not found orderItem";
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

  async updateOrderItem(req, res) {
    try {
      const id = req.params.id;
      const newOrderItem = { ...req.body };
      const filter = { _id: id };
      const update = newOrderItem;
      const options = { new: true };
      await OrderItem.findByIdAndUpdate(filter, update, options).exec();

      resObj.status = "OK";
      resObj.message = "Update successfully";
      resObj.data = newOrderItem;

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

module.exports = new OrderItemController();
