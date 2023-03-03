import { app } from './app'
import { config } from './config/config'
import { logger } from './config/logger'
import { PrismaClient } from '@prisma/client'
import { S3Client } from '@aws-sdk/client-s3'


// Load Database connection - Will throw error here if unable to connect.
export const prisma = new PrismaClient()

// Create S3 client
// FIX - Find some way to make sure this can be caught if there was an error
export const s3Client = new S3Client({})

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

const unexpectedErrorHandler = (error: Error) => {
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
