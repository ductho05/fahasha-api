const express = require("express");
const router = express.Router();

const evaluateController = require("../controllers/EvaluateController");

router.post("/product", evaluateController.getEvaluateByProductId);
router.post("/", evaluateController.getEvaluateByUser);
router.post("/insert", evaluateController.insertEvaluate);
router.post("/count", evaluateController.getCountEvaluateByProductId);
router.post("/like", evaluateController.likeComment);
router.get("/get", evaluateController.getAllComment);

module.exports = router;
