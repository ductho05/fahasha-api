const User = require('../models/User')

const connect = (io) => {

    io.on('connection', (socket) => {
        console.log('A new user connected ', socket.id)

        socket.on('save-socket', async (userId) => {
            const findUser = await User.findOne({ _id: userId }).exec()
            findUser.socket_id = socket.id

            await findUser.save()
        })

        socket.on('send-notification', () => {
            console.log("Gửi thông báo")
            io.emit('response-notification')
        })
    })
}

module.exports = { connect }
