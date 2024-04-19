import express from 'express'
import config from 'config'
import connectToDb from '../src/utils/connect'
import logger from '../src/utils/logger'
import routes from '../src/routes'

//* Create a new express application instance
const app = express()

//* Default port
const port = config.get<number>('server.port')

app.listen(port, async () => {
  logger.info(`API Listening: ${port}`)

  //* Connect to the database
  await connectToDb()

  //* Load routes
  routes(app)
})
