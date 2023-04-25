const responeObject = require("../models/responeObject")
const resObj = new responeObject("", "", {})
const fs = require("fs")

class UploadFilesController {

    async uploadImages(req, res) {
        try {
            const file = req.file
            if (file.length < 0) {
                resObj.status = "Failed"
                resObj.message = "Please selects file uploads"
                resObj.data = []
                res.json(resObj)
            }
           
            resObj.status = "OK"
            resObj.message = "Upload file successfully"
            resObj.data = file.path
            res.json(resObj)
        } catch (error) {
            resObj.status = "Failed"
            resObj.message = `Can not uploads file. Error: ${error}`
            resObj.data = {}
            res.json(resObj)
        }
    }
}

module.exports = new UploadFilesController
