const express = require("express")
const router = express.Router()
const uploadFilesController = require("../controllers/UploadFilesControllers")
const fileUploader = require("../config/cloudinary")
const authentication = require("../middleware/Authentication")

router.post("/upload-images", authentication, fileUploader.single("images"), uploadFilesController.uploadImages)

module.exports = router
