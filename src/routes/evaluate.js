const express = require("express");
const router = express.Router();

const evaluateController = require("../controllers/EvaluateController");

router.post("/product", evaluateController.getEvaluateByProductId);
router.post("/insert", evaluateController.insertEvaluate);

module.exports = router;
