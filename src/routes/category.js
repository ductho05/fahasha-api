const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/CategoryControllers");
const upload = require("../config/cloudinary")

router.get("/", categoryController.getAllCategory);
router.get("/:id", categoryController.getCategoryById);
router.post("/add", upload.single("images"), categoryController.addCategory)
router.put("/update/:id", upload.single("images"), categoryController.updateCategory)

module.exports = router;
