const CommentService = require("../services/CommentService")
const Response = require("../response/Response")
const Validator = require("../validator/Validator")
const Status = require("../utils/Status")

class CommentControllers {

    async getAllComment(req, res) {

        const rate = req.query.rate;
        const productId = req.query.productId;
        const page = req.query.page;
        const perPage = req.query.perPage;
        const sort = req.query.sort;
        const skip = (page - 1) * perPage;
        const limit = perPage * 1;

        const response = await CommentService.getAll(rate, productId, sort, skip, limit)

        res.status(response.statusCode).json(new Response(
            response.status,
            response.message,
            response.data
        ))

    }

    async getCommentById(req, res) {

        const { error, value } = Validator.idValidator.validate(req.params.id)

        if (error) {

            res.status(400).json(new Response(
                Status.ERROR,
                error.message
            ))
        } else {

            const response = await CommentService.getByField({ _id: value })

            res.status(response.statusCode).json(new Response(
                response.status,
                response.message,
                response.data
            ))
        }
    }

}

module.exports = new CommentControllers();