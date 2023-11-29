const Status = require("../utils/Status")
const Response = require("../response/Response")
const Messages = require("../utils/Messages")
const UploadFileService = require("../services/UploadFileService")

class UploadFilesController {

    async uploadImages(req, res) {
        const file = req.file
        if (!file) {

            res.status(400).json(new Response(
                Status.ERROR,
                Messages.FILE_EMPTY
            ))
        } else {

            const response = await UploadFileService.upload(file)

            res.status(response.statusCode).json(new Response(
                response.status,
                response.message,
                response.data
            ))
        }
    }
}

module.exports = new UploadFilesController
