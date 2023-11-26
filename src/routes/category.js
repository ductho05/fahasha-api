const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/CategoryControllers");
const authentication = require("../middleware/Authentication")


router.get("/", authentication, categoryController.getAllCategory);
router.get("/:id", categoryController.getCategoryById);

module.exports = router;
