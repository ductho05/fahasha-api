const express = require("express")
const router = express.Router()
const favoriteController = require("../controllers/FavoriteControllers")
//const upload = require("../config/cloudinary")

router.get("/", favoriteController.getAllFavorite)
router.post("/add", favoriteController.addFavorite)
router.post("/delete", favoriteController.deleteFavorite)
router.get("/check", favoriteController.checkFavorite)

module.exports = router
