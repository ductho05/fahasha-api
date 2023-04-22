const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://anh:anh@cluster0.pcjkvwr.mongodb.net/ecomBook?retryWrites=true&w=majority');

module.exports = mongoose