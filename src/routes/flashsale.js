const express = require("express")
const router = express.Router()
const FlashSaleController = require("../controllers/FlashSaleControllers")
const upload = require("../config/cloudinary")

router.get("/", FlashSaleController.getProduct)
router.post("/add", FlashSaleController.addProduct)


module.exports = router
