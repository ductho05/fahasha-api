const mongoose = require("mongoose")

function connect () {
    mongoose.connect('mongodb://127.0.0.1:27017/BookStore')
        .then(() => console.log('Connected!'));
}

module.exports = { connect }
