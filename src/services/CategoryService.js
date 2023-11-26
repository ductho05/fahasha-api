const ServiceResponse = require("../response/ServiceResponse")
const Status = require("../utils/Status")
const Messages = require("../utils/Messages")

class CategoryService {

    async getAll() {
        try {

            const data = await Category.aggregate([
                {
                    $addFields: {
                        field: {
                            $toObjectId: '$field'
                        }
                    }
                },
                {
                    $lookup: {
                        from: 'fields',
                        localField: 'field',
                        foreignField: '_id',
                        as: 'field'
                    }
                },
                {
                    $unwind: '$field'
                },
                {
                    $group: {
                        _id: '$field.name',
                        categories: { $push: '$$ROOT' }
                    }
                }
            ])

            return new ServiceResponse(
                200,
                Status.SUCCESS,
                Messages.GET_CATEGORY_SUCCESS,
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
}

module.exports = new CategoryService
