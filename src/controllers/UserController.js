const User = require('../models/User')
const responeObject = require('../models/responeObject')
const { ConnectionStates } = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const constants = require('../../constant/api.js')
const nodemailer = require('nodemailer')

var resObj = new responeObject('', '', {})

class UserController {

    async SendEmail(req, res) {
        try {
            const { email } = req.body
            const otp = Math.floor(1000 + Math.random() * 1000000)


            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'fahashashopclone@gmail.com',
                    pass: 'woycibkntohskmnz'
                }
            })

            const mainOptions = {
                from: 'fahashashopclone@gmail.com',
                to: email,
                subject: 'Mã xác thực OTP',
                html: `<div>Mã xác thực OTP <p style='font-size: 16px; color: red'; font-weight: 500;>${otp}</p></div>`
            }

            transporter.sendMail(mainOptions, (err, info) => {
                if (err) {
                    resObj.status = "Failure"
                    resObj.message = err
                    resObj.data = ''
                    res.json(resObj)
                } else {
                    resObj.status = "OK"
                    resObj.message = "Send email successfully"
                    resObj.data = otp
                    res.json(resObj)
                }
            })

        } catch (err) {
            resObj.status = "Failure"
            resObj.message = err.message
            resObj.data = ''
            res.json(resObj)
        }
    }

    async getUserByToken(req, res) {
        try {
            const { token } = req.body
            if (!token) {
                resObj.status = "Failure"
                resObj.message = 'token is valid'
                resObj.data = ''
                res.json(resObj)
            } else {
                const decoded = jwt.verify(token, constants.TOKEN_KEY)

                const user = await User.findOne({ _id: decoded.user_id })
                resObj.status = "OK"
                resObj.message = "get user successfully"
                resObj.data = user
                res.json(resObj)
            }
        } catch (err) {
            resObj.status = "Failure"
            resObj.message = err.message
            resObj.data = ''
            res.json(resObj)
        }
    }

    // Login with facebook
    async LoginWithFacebook(req, res) {
        try {
            const { email, username, image, faceId } = req.body
            const findUser = await User.findOne({ facebookId: faceId }).exec()
            if (findUser) {
                const token = jwt.sign(
                    { user_id: findUser._id, email },
                    constants.TOKEN_KEY,
                    {
                        expiresIn: "2h",
                    }
                )

                resObj.status = "OK"
                resObj.message = "Login Succsess"
                resObj.data = findUser
                resObj.token = token
                res.json(resObj)
            } else {
                const user = new User({
                    email: email,
                    fullName: username,
                    images: image,
                    facebookId: faceId
                })

                const token = jwt.sign(
                    { user_id: user._id, email },
                    constants.TOKEN_KEY,
                    {
                        expiresIn: "2h",
                    }
                )

                user.save()
                resObj.status = "OK"
                resObj.message = "Login Succsess"
                resObj.data = user
                resObj.token = token
                res.json(resObj)
            }

        } catch (err) {
            resObj.status = "Falure"
            resObj.message = err?.message
            resObj.data = {}
            res.json(resObj)
        }
    }

    async LoginUser(req, res) {

        try {
            const { email, password } = req.body
            if (!(email && password)) {
                resObj.status = "Falure"
                resObj.message = "Invalid Input"
                resObj.data = {}
                res.json(resObj)
            }

            // Kiểm tra user trong db
            const user = await User.findOne({ email: email })
            if (user && (await bcrypt.compare(password, user.password))) {
                // Tạo Token
                const token = jwt.sign(
                    { user_id: user._id, email },
                    constants.TOKEN_KEY,
                    {
                        expiresIn: "2h",
                    }
                )

                resObj.status = "OK"
                resObj.message = "Login Succsess"
                resObj.data = user
                resObj.token = token
                res.json(resObj)
            } else {
                resObj.status = "OK"
                resObj.message = "Email Or Password Not Matched"
                resObj.data = {}
                res.json(resObj)
            }

        } catch (err) {
            resObj.status = "Falure"
            resObj.message = err.message
            resObj.data = {}
            res.json(resObj)
        }
    }

    async RegisterUser(req, res) {

        try {
            const { email, password } = req.body
            if (!(email && password)) {
                resObj.status = "Falure"
                resObj.message = "Invalid Input"
                resObj.data = {}
                res.json(resObj)
            }

            // Kiểm tra xem đã tồn tại user chưa?
            const oldUser = await User.findOne({ 'email': email })
            if (oldUser) {
                resObj.status = "Falure"
                resObj.message = "User is already"
                resObj.data = {}
                res.json(resObj)
            }

            // Tiến hành mã hóa mật khẩu
            const encryptedPassword = await bcrypt.hash(password, 10);
            const user = new User({
                email: email.toLowerCase(),
                password: encryptedPassword
            })

            // Tạo Token
            const token = jwt.sign(
                { user_id: user._id, email },
                constants.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            )

            user.save()
            resObj.status = "OK"
            resObj.message = "Register Succsess"
            resObj.data = user
            resObj.token = token
            res.json(resObj)
        } catch (err) {
            resObj.status = "Falure"
            resObj.message = err.message
            resObj.data = {}
            res.json(resObj)
        }
    }

    // Lấy danh sách User theo phân trang
    async getAllUserPagination(req, res) {
        const page = req.query.page || 1
        const limit = req.query.limit || 10

        try {
            const userList = await User.find()
                .sort({ updateAt: -1 })
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
            const userList = await User.find({ createAt: { $gte: firstTime, $lte: lastTime } })
                .sort({ updateAt: -1 })
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
    async getAllUserByName(req, res) {
        const name = req.query.name
        const page = req.query.page
        const limit = req.query.limit

        try {
            const userList = await User.find({ $text: { $search: name, $caseSensitive: false, $diacriticSensitive: false } })
                .sort({ updatedAt: -1 })
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
            const userList = await User.find().sort({ updatedAt: -1 }).exec()

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
            const user = await User.findOne({ '_id': id }).exec()

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
            const user = await User.findOne({ 'email': email }).exec()

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
            const user = new User({ ...req.body })
            const file = req.file
            if (file) {
                user.images = file.path
            }
            if (user.password.trim() == "" || user.email.trim() == "") {
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
            const user = await User.findByIdAndRemove({ _id: id }).exec()

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
            const newUser = { ...req.body }
            const filter = { _id: id }
            const file = req.file
            if (file) {
                newUser.images = file.path
            }
            if (newUser.password) {
                const encryptedPassword = await bcrypt.hash(newUser.password, 10);
                newUser.password = encryptedPassword
            }
            const update = newUser
            const options = { new: true }
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