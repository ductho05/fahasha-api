const orderRouter = require("./order")
const orderItemRouter = require("./orderItem")
const productRouter = require("./product")
const userRouter = require("./user")
const uploadFileRouter = require("./uploadFiles")

function route(app) {
    app.use('/bookstore/api/v1/orders', orderRouter)
    app.use('/bookstore/api/v1/orderitems', orderItemRouter)
    app.use('/bookstore/api/v1/products', productRouter)
    app.use('/bookstore/api/v1/users', userRouter)
    app.use('/bookstore/api/v1', uploadFileRouter)
}

module.exports = route
