const User = require('../models/User')
const responeObject = require('../models/responeObject')

var resObj = new responeObject('','', {})

class UserController {

    // Lấy danh sách User theo phân trang
    async getAllUserPagination (req, res) {
        const page = req.query.page || 1
        const limit = req.query.limit || 10

        try {
            const userList = await User.find()
            .sort({updateAt: -1})
            .skip((page - 1) * limit)
            .limit(limit)
            resObj.status = "OK"
            resObj.message = "Found Users by Paging successfully"
            resObj.data = userList
            res.status(200)
            res.json(resObj)
        } catch (error) {
            resObj.status = "Failed"
            resObj.message = error.message
            resObj.data = ""
            res.status(500)
            res.json(resObj)
        }
    }

    // Lấy danh sách User theo thời gian tạo
    async getAllUserByTime(req, res) {
        const page = req.query.page
        const limit = req.query.limit
        const firstTime = req.query.ftime;
        const lastTime = req.query.ltime;

        try {
            const userList = await User.find({createAt: {$gte: firstTime, $lte: lastTime}})
            .sort({updateAt: -1})
            .skip((page - 1) * limit)
            .limit(limit)

            resObj.status = "OK"
            resObj.message = "Found Users by time successfully"
            resObj.data = userList
            res.status(200)
            res.json(resObj)
        } catch (error) {
            resObj.status = "Failed"
            resObj.message = error.message
            resObj.data = ""
            res.status(500)
            res.json(resObj)
        }
    }

    // Lấy danh sách User theo tên
    async getAllUserByName (req, res) {
        const name = req.query.name
        const page = req.query.page
        const limit = req.query.limit
    
        try {
            const userList = await User.find({$text: {$search: name, $caseSensitive: false, $diacriticSensitive: false}})
            .sort({updatedAt: -1})
            .skip((page - 1) * limit)
            .limit(limit)
            
            resObj.status = "Ok"
            resObj.message = "Found Users by Name successfully"
            resObj.data = userList

            res.status(200)
            res.json(resObj)
        } catch (error) {
            resObj.status = "Failed"
            resObj.message = error.message
            resObj.data = ""
            res.status(500)
            res.json(resObj)
        }
    }

    // Lấy tất cả Users
    async getAllUsers(req, res) {
        try {
            const userList = await User.find().sort({updatedAt: -1}).exec()
            
            resObj.status = "OK",
            resObj.message = "Found User successfully !"
            resObj.data = userList
            res.status(200)
            res.json(resObj)
        } catch (error) {
            resObj.status = "Failed"
            resObj.message = error.message
            resObj.data = ""
            res.status(500)
            res.json(resObj)
        }
    } 

    // Lấy danh sách User theo id
    async getUserById(req, res) {
        try {
            var id = req.params.id
            const user = await User.findOne({'_id':id}).exec()
            
            if (user) {
                resObj.status = "OK"
                resObj.message = "Found user successfully"
                resObj.data = user

                res.status(200)
                res.json(resObj)
            } else {
                resObj.status = "OK"
                resObj.message = "Not found user"
                resObj.data = ""

                res.status(404)
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

    // Lấy danh sách User theo email
    async getUserByEmail(req, res) {
        try {
            var email = req.query.email
            const user = await User.findOne({'email':email}).exec()
            
            if (user) {
                resObj.status = "OK"
                resObj.message = "Found user successfully"
                resObj.data = user

                res.status(200)
                res.json(resObj)
            } else {
                resObj.status = "OK"
                resObj.message = "Not found user"
                resObj.data = {}

                res.status(404)
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

    // Thêm User 
    async insertUser(req, res) {
        try {
            const user = new User({...req.body})
            console.log(user)
            if (user.username.trim() == "" || user.password.trim() == "" || user.email.trim() == ""){

            resObj.status = "Failed" 
            resObj.message = "Records is null"
            resObj.data = ""

            res.json(resObj)
            } 

            else {
            resObj.status = "OK"
            resObj.message = "Insert user successfully"
            resObj.data = user

            user.save()
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

    // Xóa User
    async removeUser(req, res) {
        try {
            const id = req.params.id;
            const user = await User.findByIdAndRemove({_id: id}).exec()
            
            if (user) {
                resObj.status = "OK"
                resObj.message = "Remove user successfully"
                resObj.data = `user id: ${id}`
                res.status(200)
                res.json(resObj) 
            } else {
                resObj.status = "Failed"
                resObj.message = "Not found user"
                resObj.data = ""

                res.status(404)
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

    // Cập nhật User 
    async updateUser(req, res) {
        try {
            const id = req.params.id
            const newUser = {...req.body}
            const filter = {_id: id}
            const file = req.file
            if (file) {
                newUser.images = file.path
            }
            const update = newUser
            const options = {new: true}
            await User.findByIdAndUpdate(filter, update, options).exec()

            resObj.status = "OK"
            resObj.message = "Update User successfully"
            resObj.data = newUser

            res.status(200)
            res.json(resObj)
        } catch (error) {
            resObj.status = "Failed"
            resObj.message = error.message
            resObj.data = ""

            res.status(500)
            res.json(resObj)
        }
    }
}

module.exports = new UserController