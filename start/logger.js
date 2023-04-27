const winston = require('winston');
require('winston-mongodb');


process.on('uncaughtException', (error) => {
  console.log(error)
  logger.info(error.message, error);
});

process.on('unhandledRejection', (error) => {
  console.log(error)
  logger.info(error.message, error);
});


const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'exception.log' }),
    new winston.transports.MongoDB({
      db: 'mongodb://127.0.0.1:27017/movies',
      options: { useUnifiedTopology: true }
    }),
  ]
});

function handleUncaughtException(ex) {
  console.log('We got an handleUncaughtException');
  logger.error(ex.message, ex, () => {
    process.exit(1);
  });
}
function handleUnRejectionException(error) {
  console.log('We got an unhandleRejection');
  winston.add(new winston.transports.File({ filename: 'unhandleException.log' }));
  winston.info(error.message, error);

}
exports.handleUncaughtException = handleUncaughtException
exports.handleUnRejectionException = handleUnRejectionException
exports.logger = logger;