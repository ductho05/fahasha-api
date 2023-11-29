const express = require("express")
const router = express.Router()
const orderItemController = require("../controllers/OrderItemController")
const authentication = require("../middleware/Authentication")
const auhthorization = require("../middleware/Authorization")

router.get("/", authentication, orderItemController.getAllOrderItem)
router.get("/order", authentication, orderItemController.getAllOrderItemByOrder)
router.post("/order/filter", authentication, orderItemController.getAllOrderItemByOrderStatus)
router.get("/:id", authentication, orderItemController.getOrderItemById)
router.post("/insert", authentication, orderItemController.insertOrderItem)
router.delete("/delete/:id", auhthorization, orderItemController.removeOrderItem)
router.put("/update/:id", authentication, orderItemController.updateOrderItem)

module.exports = router
