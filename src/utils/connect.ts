import mongoose from 'mongoose'
import config from 'config'

function connect() {
  const dbUri = config.get<string>('server.dbUri')

  return mongoose
    .connect(dbUri)
    .then(() => {
      console.log('Connected to the database')
    })
    .catch((error) => {
      console.error('Error connecting to the database: ', error)
      process.exit(1)
    })
}

export default connect
