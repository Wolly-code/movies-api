const {logger} = require('../start/logger');

module.exports = function (error, req, res, next) {
    logger.info(error.message, error);
    res.status(500).send("Something failed.");
}