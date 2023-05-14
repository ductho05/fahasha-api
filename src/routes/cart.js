const express = require("express");
const router = express.Router();

const cartControllers = require("../controllers/CartControllers");

router.get("/", cartControllers.getAllCarts);
router.post("/add", cartControllers.insertCard);
router.delete("/delete/:id", cartControllers.removeCart);
router.put("/update/:id", cartControllers.updateCart);
router.post("/user", cartControllers.getCartByUserId);

module.exports = router;
