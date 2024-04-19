import express from 'express'
import config from 'config'
import connect from '../src/utils/connect'

//* Create a new express application instance
const app = express()

//* Default port
const port = config.get<number>('server.port')

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`)

  await connect()
})
