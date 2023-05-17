const express = require("express")
const router = express.Router()
const userController = require("../controllers/UserController")
const upload = require("../config/cloudinary")

router.get("/", userController.getAllUsers)
router.get("/:id", userController.getUserById)
router.post("/insert", userController.insertUser)
router.delete("/delete/:id", userController.removeUser)
router.put("/update/:id", upload.single("images"), userController.updateUser)
router.post("/search", userController.getAllUserByName)
router.post("/", userController.getUserByEmail)
router.post("/filter/time", userController.getAllUserByTime)
router.post("/", userController.getAllUserPagination)

module.exports = router