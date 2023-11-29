const ServiceResponse = require("../response/ServiceResponse")
const Status = require("../utils/Status")
const Messages = require("../utils/Messages")

class CategoryService {

    async upload(file) {
        try {

            return new ServiceResponse(
                200,
                Status.SUCCESS,
                Messages.UPLOAD_FILE_SUCCESS,
                file.path
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
