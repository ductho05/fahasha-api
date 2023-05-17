const Evaluate = require("../models/Evaluate")
const responeObject = require("../models/responeObject")

var resObj = new responeObject("", "", {})
class EvaluateController {

    async getEvaluateByProductId (req, res) {
        try {
            const id  = req.query._id
            const evaluate = await Evaluate.find({product: id}).populate("user").populate({
                path: "product",
                populate: {
                    path: "categoryId",
                    model: "Category",
                },
            }).exec()
            if (evaluate) {
                resObj.status = "OK",
                resObj.message = "Found evaluate successfully !"
                resObj.data = evaluate
                res.status(200)
                res.json(resObj)
            } else {
                resObj.status = "OK",
                resObj.message = "No evaluate"
                resObj.data = evaluate
                res.status(200)
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

    async insertEvaluate (req, res) {
        try {
            const evaluate = new Evaluate({...req.body})
            
            if (evaluate) {
                if (evaluate.rate == null) {
                    resObj.status = "Failed"
                    resObj.message = "Records is null"
                    resObj.data = ""
        
                    res.json(resObj)
                } else {
                    resObj.status = "OK"
                    resObj.message = "Insert evaluate successfully"
                    resObj.data = evaluate
        
                    evaluate.save()
                    res.json(resObj)
                }
            } else {
                resObj.status = "Failed"
                resObj.message = "null data"
                resObj.data = ""
    
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
}
    

module.exports= new EvaluateController