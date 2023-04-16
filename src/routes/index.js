const orderRouter = require("./order")
const orderItemRouter = require("./orderItem")

function route(app) {
    app.use('/bookstore/api/v1/orders', orderRouter)
    app.use('/bookstore/api/v1/orderitems', orderItemRouter)
}

module.exports = route
