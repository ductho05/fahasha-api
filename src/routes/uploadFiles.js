const express = require("express")
const router = express.Router()
const uploadFilesController = require("../controllers/UploadFilesControllers")
const fileUploader = require("../config/cloudinary")

router.post("/upload-images", fileUploader.single("images"), uploadFilesController.uploadImages)

module.exports = router
