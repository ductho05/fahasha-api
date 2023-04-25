const express = require("express")
// const router = express.Router()
const app = express()
const cors = require("cors")
const route = require('./routes')
const bodyParser = require("body-parser")
const db = require("./config/db/DbConnection")

// Kết nối database
db.connect()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

route(app)

// Khai báo port
var port = 3000

app.listen(port, () => {
    console.log(`App listening port http://127.0.0.1:${port}`)
})

module.exports = port
