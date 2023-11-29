const Response = require("../response/Response")
const FieldService = require("../services/FieldService")

class FieldControllers {

    async getAllField(req, res) {

        const response = await FieldService.getAll()

        res.status(response.statusCode).json(new Response(
            response.status,
            response.message,
            response.data
        ))
    }

    async insertField(req, res) {

        const data = req.body

        const response = await FieldService.insert(data)

        res.status(response.statusCode).json(new Response(
            response.status,
            response.message,
            response.data
        ))
    }
}

module.exports = new FieldControllers()
