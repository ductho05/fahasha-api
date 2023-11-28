const Comment = require("../models/Comment")
const ServiceResponse = require("../response/ServiceResponse")
const Status = require("../utils/Status")
const Messages = require("../utils/Messages")

class CommentService {

    async getAll(productId, rate, sort, skip, limit) {

        try {

            const data = await Comment.find(productId ? { productId: productId } : {})
                .find(rate ? { rate: rate } : {})
                .sort(sort ? { createdAt: sort } : {})
                .skip(skip)
                .limit(limit)
                .exec()

            return new ServiceResponse(
                200,
                Status.SUCCESS,
                Messages.GET_COMMENT_SUCCESS,
                data
            )
        } catch (err) {

            return new ServiceResponse(
                500,
                Status.ERROR,
                Messages.INTERNAL_SERVER
            )
        }
    }

    async getByField(field) {

        try {

            const comment = Comment.findOne(field).exec()

            if (comment) {

                return new ServiceResponse(
                    400,
                    Status.ERROR,
                    Messages.NOT_FOUND_DATA,
                    data
                )
            } else {

                return new ServiceResponse(
                    200,
                    Status.SUCCESS,
                    Messages.GET_COMMENT_SUCCESS,
                    data
                )
            }

        } catch (err) {

            return new ServiceResponse(
                500,
                Status.ERROR,
                Messages.INTERNAL_SERVER
            )
        }
    }
}

module.exports = new CommentService
