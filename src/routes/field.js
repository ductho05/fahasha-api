const express = require("express");
const router = express.Router();
const fieldController = require("../controllers/FieldControllers");

router.get("/", fieldController.getAllField);
router.post("/insert", fieldController.insertField);

module.exports = router;