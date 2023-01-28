const app = require('./app')
const config = require('./config/config')
const logger = require('./config/logger')

let server;
// Load Database and upon successful connection, Start server
server = app.listen(config.port, () => {
  logger.info(`Listening on port ${config.port}`);
})

const exitHandler = () => {
  if(server) {
    server.close(() => {
      logger.info('Server session closed');
      process.exit(1);
    })
  }
  else{
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
}

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if(server){
    server.close();
  }
})


