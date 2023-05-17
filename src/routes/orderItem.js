const express = require("express")
const router = express.Router()
const orderItemController = require("../controllers/OrderItemController")

router.get("/", orderItemController.getAllOrderItem)
router.get("/:id", orderItemController.getOrderItemById)
router.post("/insert", orderItemController.insertOrderItem)
router.delete("/delete/:id", orderItemController.removeOrderItem)
router.put("/update/:id", orderItemController.updateOrderItem)
router.post("/order", orderItemController.getAllOrderItemByOrder)

module.exports = router
