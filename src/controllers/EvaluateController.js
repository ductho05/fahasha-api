const Evaluate = require("../models/Evaluate")
const responeObject = require("../models/responeObject")
const mongoose = require("mongoose")

var resObj = new responeObject("", "", {})
class EvaluateController {

    async likeComment(req, res) {
        try {
            const { commentId, userId } = req.body
            if (commentId && userId) {
                const comment = await Evaluate.findOne({ _id: commentId }).exec()
                if (comment) {
                    const likes = comment?.likes || []
                    const foundLike = likes.find(l => l == userId)
                    if (foundLike) {
                        const newLikes = likes.filter(l => l != userId)
                        comment.likes = [...newLikes]
                    } else {
                        likes.push(userId)
                        comment.likes = [...likes]
                    }
                    comment.save()
                    resObj.status = "Ok"
                    resObj.message = "Like/Dislikes comment success"
                    resObj.data = comment
                    res.json(resObj)
                } else {
                    resObj.status = "Failed"
                    resObj.message = "Not found comment"
                    resObj.data = {}
                    res.json(resObj)
                }
            } else {
                resObj.status = "Failed"
                resObj.message = "Comment Id or User Id Null"
                resObj.data = {}
                res.json(resObj)
            }
        } catch (err) {
            resObj.status = "Failed"
            resObj.message = err.message
            resObj.data = {}
            res.json(resObj)
        }
    }

    async getCountEvaluateByProductId(req, res) {
        try {
            const id = req.query._id
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

    async getEvaluateByUser(req, res) {
        try {
            const id = req.query.user
            const evaluate = await Evaluate.find({ user: id }).populate({
                path: "product",
                populate: {
                    path: "categoryId",
                    model: "Category",
                },
            }).sort({ createdAt: -1 }).exec()
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

    async getEvaluateByProductId(req, res) {
        try {
            var id = req.query._id
            var sort = req.query.sort
            let typeSort = -1
            if (sort) {
                if (sort === 'desc') {
                    typeSort = 1
                }
                const findId = new mongoose.Types.ObjectId(id)
                Evaluate.aggregate([
                    {
                        $match: { product: findId }
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "user",
                            foreignField: "_id",
                            as: "user"
                        }
                    },
                    {
                        $unwind: "$user"
                    },
                    {
                        $project: {
                            rate: 1,
                            comment: 1,
                            product: 1,
                            user: 1,
                            likes: 1,
                            updatedAt: 1,
                            likeCount: { $size: '$likes' }
                        }
                    },
                    {
                        $sort: { likeCount: typeSort }
                    }
                ])
                    .then((results) => {
                        resObj.status = "OK"
                        resObj.message = "Found evaluate successfully !"
                        resObj.data = results
                        res.status(200)
                        res.json(resObj)
                    })
                    .catch(err => {
                        resObj.status = "Failed"
                        resObj.message = err.message
                        resObj.data = ""
                        res.status(500)
                        res.json(resObj)
                    })
            } else {
                const evaluate = await Evaluate.find({ product: id }).populate("user").populate({
                    path: "product",
                    populate: {
                        path: "categoryId",
                        model: "Category",
                    },
                }).sort({ updatedAt: -1 }).exec()
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
            }

        } catch (error) {
            resObj.status = "Failed"
            resObj.message = error.message
            resObj.data = ""
            res.status(500)
            res.json(resObj)
        }
    }

    async insertEvaluate(req, res) {
        try {
            const evaluate = new Evaluate({ ...req.body })

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


module.exports = new EvaluateController