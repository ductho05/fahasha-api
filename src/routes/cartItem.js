const express = require("express")
const router = express.Router()

const cartItemController = require('../controllers/CartItemControllers');

router.post('/user', cartItemController.getAllCartItems);
router.post('/product', cartItemController.getCartItemByProduct);
router.post('/add', cartItemController.insertCardItem);
router.post('/delete', cartItemController.removeCartItem);
router.put('/update/:id', cartItemController.updateCardItem);

module.exports = router;