const mongoose = require("mongoose")

function connect () {
    mongoose.connect('mongodb+srv://anh:anh@cluster0.pcjkvwr.mongodb.net/ecomBook?retryWrites=true&w=majority')
        .then(() => console.log('Connected!'));
}

module.exports = { connect }
