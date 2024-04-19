import express from 'express'
import config from 'config'
import connect from '../src/utils/connect'
import logger from '../src/utils/logger'

//* Create a new express application instance
const app = express()

//* Default port
const port = config.get<number>('server.port')

app.listen(port, async () => {
  logger.info(`Server is running on http://localhost:${port}`)

  await connect()
})
