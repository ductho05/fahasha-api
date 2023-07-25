const Evaluate = require("../models/Evaluate")
const responeObject = require("../models/responeObject")

var resObj = new responeObject("", "", {})
class EvaluateController {

    async getCountEvaluateByProductId (req, res) {
        try {
            const id  = req.query._id
            Promise.all([
                Evaluate.count({
                    product: id
                }),
                Evaluate.count({
                    product: id,
                    rate: 1
                }),
                Evaluate.count({
                    product: id,
                    rate: 2
                }),
                Evaluate.count({
                    product: id,
                    rate: 3
                }),
                Evaluate.count({
                    product: id,
                    rate: 4
                }),
                Evaluate.count({
                    product: id,
                    rate: 5
                })
            ]).then((result) => {
                const evaluates = {
                    total: result.shift(),
                    rate: [...result]
                }
                resObj.status = "OK",
                resObj.message = "Count evaluate successfully !"
                resObj.data = evaluates
                res.status(200)
                res.json(resObj)
            })
        } catch (error) {
            resObj.status = "Failed"
            resObj.message = error.message
            resObj.data = ""
            res.status(500)
            res.json(resObj)
        }
    }

    async getEvaluateByUser (req, res) {
        try {
            const id  = req.query.user
            const evaluate = await Evaluate.find({user: id}).populate({
                path: "product",
                populate: {
                    path: "categoryId",
                    model: "Category",
                },
            }).sort({createdAt: -1}).exec()
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