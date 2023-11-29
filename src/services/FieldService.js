const ServiceResponse = require("../response/ServiceResponse")
const Status = require("../utils/Status")
const Messages = require("../utils/Messages")
const Field = require("../models/Field")

class FieldService {

    async getAll() {

        try {

            const data = await Field.find()

            return new ServiceResponse(
                200,
                Status.SUCCESS,
                Messages.GET_DATA_SUCCESS,
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

    async insert(data) {

        try {

            const field = new Field({ ...data })

            await field.save()

            return new ServiceResponse(
                200,
                Status.SUCCESS,
                Messages.INSERT_DATA_SUCCESS
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

module.exports = new FieldService
