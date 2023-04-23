const express = require("express")
const router = express.Router()
const uploadFilesController = require("../controllers/UploadFilesControllers")
// nhúng module multer vào ứng dụng
const multer = require('multer');
const path = require("path")

// định nghĩa storage engine mà multer sẽ sử dụng để lưu file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/uploads/')
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname)
    cb(null, 'bookImage' + '-' + Date.now() + ext)
  }
})

// khởi tạo đối tượng upload multer
const upload = multer({ storage: storage })

router.post("/upload-images", upload.array('images'), uploadFilesController.uploadImages)
router.get("/getimages", uploadFilesController.getFile)

module.exports = router
