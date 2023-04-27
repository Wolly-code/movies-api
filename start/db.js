const mongoose = require('mongoose');
const winston = require("winston");

module.exports = function (params) {
    mongoose.connect('mongodb://127.0.0.1:27017/movies')
        .then(() => {
            winston.info('Connected to MongoDB');
        })

}