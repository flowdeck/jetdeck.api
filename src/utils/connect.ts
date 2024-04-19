import mongoose from 'mongoose'
import config from 'config'
import logger from './logger'

function connectToDb() {
  const dbUri = config.get<string>('server.dbUri')

  return mongoose
    .connect(dbUri)
    .then(() => {
      logger.info('Connected to the MongoDB')
    })
    .catch((error) => {
      logger.error('Error connecting to the MongoDB: ', error)
      process.exit(1)
    })
}

export default connectToDb
