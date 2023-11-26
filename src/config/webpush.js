const webpush = require('web-push')
require('dotenv').config()

function configWebPush() {

    cconst vapiKeys = {
        publicKey: process.env.PUBLIC_KEY,
        privateKey: process.env.PRIVATE_KEY
    }
    webpush.setVapidDetails('mailto:bookstore.ta.group@gmail.com', vapiKeys.publicKey, vapiKeys.privateKey)
}

module.exports = configWebPush
