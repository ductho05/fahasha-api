const webpush = require('web-push')
require('dotenv').config()

function configWebPush() {

    console.log(process.env.PUBLIC_KEY)
    const vapiKeys = {
        publicKey: 'BChIP9bgEuPaXNXFpNSQaIVpF5DsKYSl9WoueBtNKA-FX1LOvuS6oxc-92DBgFMgcojDPfTzPvxmbzeFz27lJ68',
        privateKey: 'RZZQrjBCkVj0_WZorvdTi2aQeFC1y_Eve8Iwh_mDUW0'
    }
    webpush.setVapidDetails('mailto:bookstore.ta.group@gmail.com', vapiKeys.publicKey, vapiKeys.privateKey)
}

module.exports = configWebPush
