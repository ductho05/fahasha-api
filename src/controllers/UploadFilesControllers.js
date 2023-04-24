const responeObject = require("../models/responeObject")
const resObj = new responeObject("", "", {})
const fs = require("fs")

class UploadFilesController {

    async uploadImages(req, res) {
        try {
            const file = req.files
            if (file.length < 0) {
                resObj.status = "Failed"
                resObj.message = "Please selects file uploads"
                resObj.data = []
                return res.json(resObj)
            }
            const fileNames = []
            file.forEach((fileEach) => {
                fileNames.push(fileEach.filename) 
            }) 
            resObj.status = "OK"
            resObj.message = "Upload file successfully"
            resObj.data = fileNames
            return res.json(resObj)
        } catch (error) {
            resObj.status = "Failed"
            resObj.message = `Can not uploads file. Error: ${error}`
            resObj.data = {}
            return res.json(resObj)
        }
    }

    async getFile(req, res) {
        let fileName = "src/uploads/" + req.query.images
        fs.readFile(fileName, (err, fileData) => {
            if (err) {
                resObj.status = "Failed"
                resObj.message = `Can not read file. Error: ${err}`
                resObj.data = ""

                return res.json(resObj)
            }

            res.writeHead(200, {'Content-Type': 'image/jpeg'})
            res.end(fileData)
        })
    }
}

module.exports = new UploadFilesController
