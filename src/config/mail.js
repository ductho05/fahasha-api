const constans = require("../utils/api")
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: constans.mailSender,
        pass: constans.mailPassword
    }
})

module.exports = transporter
