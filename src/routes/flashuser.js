const express = require("express")
const router = express.Router()
const FlashUserControllers = require("../controllers/FlashUserControllers")
//const upload = require("../config/cloudinary")

router.get("/", FlashUserControllers.getFlash)
router.post("/add", FlashUserControllers.addFlash)
// router.post("/delete", FlashUserControllers.deleteFavorite)
// router.get("/check", FlashUserControllers.checkFavorite)

module.exports = router
