const express = require("express")
const router = express.Router()
const orderControllers = require("../controllers/OrderControllers")

router.get("/", orderControllers.getAllOrders)




router.get("/:id", orderControllers.getOrderById)
router.post("/insert", orderControllers.insertOrder)
router.delete("/delete/:id", orderControllers.removeOrder)
router.put("/update/:id", orderControllers.updateOrder)
router.post("/search", orderControllers.getAllOrderByName)
router.post("/filter/time", orderControllers.getAllOrderByTime)
router.post("/", orderControllers.getAllOrderPaginaion)
router.post("/filter", orderControllers.getAllOrderByStatus)

module.exports = router
