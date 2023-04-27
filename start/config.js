const config = require('config');

module.exports = function () {
    if (!config.get('jwtPrivateKey')) {
        winston.info('Connected to MongoDB');
        throw new Error('FATAL ERROR: JWT IS NOT INITIALIZED');

    }
}