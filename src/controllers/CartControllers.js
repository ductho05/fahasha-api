const Cart=require('../models/Cart')
const responeObject = require("../models/responeObject")

var resObj = new responeObject("", "", {})
class CartControllers {
    async getAllCarts (req, res) {
        try {
            const cartList = await Cart.find().exec()
            
            resObj.status = "OK",
            resObj.message = "Found cart successfully !"
            resObj.data = cartList
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
    async insertCard (req, res) {
        try {
            const cart = new Cart({...req.body})
            console.log(cart)
        if (cart.total==null) {

            resObj.status = "Failed"
            resObj.message = "Records is null"
            resObj.data = ""

            res.json(resObj)
        } else {
            resObj.status = "OK"
            resObj.message = "Insert cart successfully"
            resObj.data = cart

            cart.save()
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
    async removeCart (req, res) {
        try {
            const id = req.params.id;
            const cart = await Cart.findByIdAndRemove({_id: id}).exec()
            
            if (cart) {
                resObj.status = "OK"
                resObj.message = "Remove cart successfully"
                resObj.data = `cart id: ${id}`
                res.status(200)
                res.json(resObj) 
            } else {
                resObj.status = "Failed"
                resObj.message = "Not found cart"
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
    async updateCart (req, res) {
        try {
            const id = req.params.id
            const newCart = {...req.body}
            const filter = {_id: id}
            const update = newCart
            const options = {new: true}
            await Cart.findByIdAndUpdate(filter, update, options).exec()

            resObj.status = "OK"
            resObj.message = "Update successfully"
            resObj.data = newCart

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
    

module.exports= new CartControllers