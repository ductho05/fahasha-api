const express = require("express")
const router = express.Router()
const productController = require("../controllers/ProductControllers")
const upload = require("../config/cloudinary")

router.get("/", productController.getAllProduct)
<<<<<<< HEAD
router.get("/count_product", productController.getCountProduct)
=======
>>>>>>> cc7d49ed3f7fe14247c495dfc579f3c75ad8296a
router.get("/id/:id", productController.getProductById)
router.get("/title/:title", productController.getProductByName)
router.get("/author/:author", productController.getProductByAuthor)
router.get("/published_date/:start/:end", productController.getProductByYear)
router.post("/category", productController.getProductByCategory)
router.get("/new/:num", productController.getNewProduct)
router.get("/sale/:num", productController.getLowestProduct)
router.get("/bestseller/:num", productController.getBestSellerProduct)
router.get("/price/:start/:end/:sort", productController.getProductByPrice)
router.get("/textbooks", productController.getProductByCategoryName)
router.post("/add", productController.addProduct)
router.put("/update/:id", upload.single('images'), productController.updateProduct)
router.get("/delete/:id", productController.deleteProduct)
<<<<<<< HEAD
router.get("/bestseller-limit", productController.getProductBestSellerLimit)


=======
router.get("/maxcategory", productController.getNumProductByCategory)
router.get("/rate", productController.getNumProductByRate)
>>>>>>> cc7d49ed3f7fe14247c495dfc579f3c75ad8296a

module.exports = router
