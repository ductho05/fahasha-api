const express = require("express")
const router = express.Router()
const FlashSaleController = require("../controllers/FlashSaleControllers")
const upload = require("../config/cloudinary")

router.get("/", FlashSaleController.getProduct)
router.post("/add", FlashSaleController.addProduct)
router.get("/:id", FlashSaleController.getFlashById)
router.get("/delete/:id", FlashSaleController.deleteFlashSale)
router.post("/update/:id", FlashSaleController.updateFlashSale)

//setInterval(FlashSaleController.checkAndDeleteExpiredSales, 1000);

module.exports = router
