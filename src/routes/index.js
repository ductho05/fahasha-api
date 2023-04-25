const orderRouter = require("./order")
const orderItemRouter = require("./orderItem")
const productRouter = require("./product")
const userRouter = require("./user")
const categoryRouter = require("./category")
const uploadFileRouter = require("./uploadFiles")

function route(app) {
    app.use('/bookstore/api/v1/orders', orderRouter)
    app.use('/bookstore/api/v1/categories', categoryRouter)
    app.use('/bookstore/api/v1/orderitems', orderItemRouter)
    app.use('/bookstore/api/v1/products', productRouter)
    app.use('/bookstore/api/v1/users', userRouter)
    app.use('/bookstore/api/v1', uploadFileRouter)
    app.use("/bookstore/api/v1/cart", cartRouter);
    app.use("/bookstore/api/v1/cartitems", cartItemRouter)
}

module.exports = route
