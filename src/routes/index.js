<<<<<<< HEAD
const orderRouter = require("./order")
const orderItemRouter = require("./orderItem")
const productRouter = require("./product")
const userRouter = require("./user")
const categoryRouter = require("./category")
const uploadFileRouter = require("./uploadFiles")
const cartRouter = require("./cart")
const cartItemRouter = require("./cartItem")
const evaluateRouter = require("./evaluate")
const commentRouter = require("./comment")
const fieldRouter = require("./field")

function route(app) {
    app.use('/bookstore/api/v1/orders', orderRouter)
    app.use('/bookstore/api/v1/categories', categoryRouter)
    app.use('/bookstore/api/v1/orderitems', orderItemRouter)
    app.use('/bookstore/api/v1/products', productRouter)
    app.use('/bookstore/api/v1/users', userRouter)
    app.use('/bookstore/api/v1/', uploadFileRouter)
    app.use("/bookstore/api/v1/cart", cartRouter);
    app.use("/bookstore/api/v1/cartitems", cartItemRouter)
    app.use("/bookstore/api/v1/evaluates", evaluateRouter)
    app.use("/bookstore/api/v1/comments", commentRouter)
    app.use("/bookstore/api/v1/fields", fieldRouter)

=======
const orderRouter = require("./order");
const orderItemRouter = require("./orderItem");
const productRouter = require("./product");
const userRouter = require("./user");
const categoryRouter = require("./category");
const uploadFileRouter = require("./uploadFiles");
const cartRouter = require("./cart");
const cartItemRouter = require("./cartItem");
const evaluateRouter = require("./evaluate");
const commentRouter = require("./comment");
const favoriteRouter = require("./favorite");

function route(app) {
  app.use("/bookstore/api/v1/orders", orderRouter);
  app.use("/bookstore/api/v1/categories", categoryRouter);
  app.use("/bookstore/api/v1/orderitems", orderItemRouter);
  app.use("/bookstore/api/v1/products", productRouter);
  app.use("/bookstore/api/v1/users", userRouter);
  app.use("/bookstore/api/v1/", uploadFileRouter);
  app.use("/bookstore/api/v1/cart", cartRouter);
  app.use("/bookstore/api/v1/cartitems", cartItemRouter);
  app.use("/bookstore/api/v1/evaluates", evaluateRouter);
  app.use("/bookstore/api/v1/comments", commentRouter);
  app.use("/bookstore/api/v1/favorites", favoriteRouter);
>>>>>>> cc7d49ed3f7fe14247c495dfc579f3c75ad8296a
}

module.exports = route;
