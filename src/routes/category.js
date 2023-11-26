const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/CategoryControllers");


router.get("/", categoryController.getAllCategory);
router.get("/:id", categoryController.getCategoryById);
router.get("/simple", categoryController.getAllCategorySimple);





module.exports = router;
