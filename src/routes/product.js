const express = require("express")
const router = express.Router()
const productController = require("../controllers/ProductControllers")

router.post("/", productController.getAllProduct)
router.get("/:id", productController.getProductById)

module.exports = router
