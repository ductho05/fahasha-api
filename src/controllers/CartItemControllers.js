const Cart = require('../models/Cart')
const CartItem = require('../models/CartItem')
const responeObject = require("../models/responeObject")

var resObj = new responeObject("", "", {})
class CartItemControllers {

    async getCartItemByProduct (req, res) {
        try {
            const product = req.query.product
            const cartItem = await CartItem.findOne({product: product}).populate({
                path: "product",
                populate: {
                    path: "categoryId",
                    model: "Category"
                }
            }).populate("cart").exec()
            
            resObj.status = "OK",
            resObj.message = "Found cartItem successfully !"
            resObj.data = cartItem
            res.status(200)
            res.json(resObj)
        } catch (error) {
            resObj.status = "Failed"
            resObj.message = error.message
            resObj.data = ""
            res.status(500)
            res.json(resObj)
        }
    }

    async getAllCartItems (req, res) {
        try {
            const id = req.query.id
            const cart = await Cart.findOne({user: id}).exec()
            const cartItemList = await CartItem.find({cart: cart._id}).populate({
                path: "product",
                populate: {
                    path: "categoryId",
                    model: "Category",
                },
            }).populate("cart").exec()
            
            resObj.status = "OK",
            resObj.message = "Found cartItem successfully !"
            resObj.data = cartItemList
            res.status(200)
            res.json(resObj)
        } catch (error) {
            resObj.status = "Failed"
            resObj.message = error.message
            resObj.data = ""
            res.status(500)
            res.json(resObj)
        }
    }
    async insertCardItem (req, res) {
        try {
            const cartItem = new CartItem({...req.body})
   
        if (cartItem.quantity==null) {

            resObj.status = "Failed"
            resObj.message = "Records is null"
            resObj.data = ""

            res.json(resObj)
        } else {
            resObj.status = "OK"
            resObj.message = "Insert cartItem successfully"
            resObj.data = cartItem

            cartItem.save()
            res.json(resObj)
        }

        } catch (error) {
            resObj.status = "Failed"
            resObj.message = error.message
            resObj.data = ""

            res.status(500)
            res.json(resObj)
        }
    }
    async removeCartItem (req, res) {
        try {
            const id = req.query.id;
            const cartItem = await CartItem.findByIdAndRemove({_id: id}).exec()
            
            if (cartItem) {
                resObj.status = "OK"
                resObj.message = "Remove cartItem successfully"
                resObj.data = `cartItem id: ${id}`
                res.status(200)
                res.json(resObj) 
            } else {
                resObj.status = "Failed"
                resObj.message = "Not found cartItem"
                resObj.data = ""

                res.status(404)
                res.json(resObj)
            }
                  
        } catch (error) {
            resObj.status = "Failed"
            resObj.message = error.message
            resObj.data = ""

            res.status(500)
            res.json(resObj)
        }
    }
    async updateCardItem (req, res) {
        try {
            const id = req.params.id
            const newCartItem = {...req.body}
            const filter = {_id: id}
            const update = newCartItem
            const options = {new: true}
            await CartItem.findByIdAndUpdate(filter, update, options).exec()

            resObj.status = "OK"
            resObj.message = "Update successfully"
            resObj.data = ""

            res.status(200)
            res.json(resObj)
            
        } catch (error) {
            resObj.status = "Failed"
            resObj.message = error.message
            resObj.data = ""

            res.status(500)
            res.json(resObj)
        }
    }

}
    

module.exports= new CartItemControllers