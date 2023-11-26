const webpush = require('web-push')
require('dotenv').config()

function configWebPush() {

    const publicKey = Buffer.from(process.env.PUBLIC_KEY, 'base64')
    const privateKey = Buffer.from(process.env.PRIVATE_KEY, 'base64')

    const vapiKeys = {
        publicKey: publicKey,
        privateKey: privateKey
    }
    webpush.setVapidDetails('mailto:bookstore.ta.group@gmail.com', vapiKeys.publicKey, vapiKeys.privateKey)
}

module.exports = configWebPush
