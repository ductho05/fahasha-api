const Product = require("../models/Product")
const responeObject = require("../models/responeObject")

const resObj = new responeObject("", "", {})

class ProductControllers {

    // Lấy tất cả dữ liệu sách + phân trang + sắp theo giá
    async getAllProduct(req, res) {
        // Số trang
        var page = parseInt(req.query.page) || 1;
        // Số sản phẩm trên 1 trang
        var perPage = parseInt(req.query.perPage) || 10;
        // Tính số sản phẩm bỏ qua
        var start = (page - 1) * perPage;
        // Tính số sản phẩm lấy ra
        var end = perPage;
        // Sắp xếp giảm dần theo giá
        var sort = req.query.sort;
       
        try {
            const data = await Product
            .find()
            .sort({price: sort})
            .skip(start)
            .limit(end);
            if (data) {
                resObj.status = "OK"
                resObj.message = "Found product successfully"
                resObj.data = data
                res.json(resObj)
            } else {
                resObj.status = "Failed"
                resObj.message = "Not found data"
                resObj.data = ""
                res.json(resObj)
            }
        } catch (err) {
            resObj.status = "Failed"
            resObj.message = "Error when get data"
            resObj.data = ""
            res.json(resObj)
        }
    }

    async getProductById(req, res) {
        try {
            const data = await bookModel.findById(req.params.id);
            if (data) {
                resObj.status = "OK"
                resObj.message = "Get product successfully"
                resObj.data = data
                return res.json(resObj);
            } else {
                resObj.status = "Failed"
                resObj.message = "Not found product"
                resObj.data = {}
                return res.json(resObj);
            }
        } catch (err) {
            resObj.status = "Failed"
            resObj.message = `Error get data. Error: ${err}`
            resObj.data = {}
            return res.json(resObj);
        }
    }
}

module.exports = new ProductControllers
