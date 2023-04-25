const cloudinary = require("cloudinary").v2
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require("multer")

cloudinary.config ({
    cloud_name: "dgntuytuu",
    api_key: "315486465195138",
    api_secret: "21ywo6Pym-DB8B2nLDW-u6aQuAs"
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "book-store",
        unique_filename: true
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname)
        cb(null, 'bookImage' + '-' + Date.now() + ext)
    }
})

const uploadCloud = multer({ storage })

module.exports = uploadCloud
