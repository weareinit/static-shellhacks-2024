import { app } from './app.js'
import { config } from './config/config.js'
import { logger } from './config/logger.js'
import { PrismaClient } from '@prisma/client'
import pkg from 'aws-sdk'


// Load Database connection - Will throw error here if unable to connect.
export const prisma = new PrismaClient()

const AWS = pkg;

AWS.config.getCredentials(function(err) {
  if (err) console.log(err.stack);
  // credentials not loaded
  else {
    console.log("Access key found. Credentials loaded!");
  }
});

AWS.config.update({region: config.aws_region})

export const s3 = new AWS.S3();

// Load server
const server = app.listen(config.port, () => {
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
