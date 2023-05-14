const express = require("express")
const router = express.Router()

const cartItemController = require('../controllers/CartItemControllers');

router.get('/', cartItemController.getAllCartItems);
router.post('/add', cartItemController.insertCardItem);
router.delete('/delete/:id', cartItemController.removeCartItem);
router.put('/update/:id', cartItemController.updateCardItem);

module.exports = router;