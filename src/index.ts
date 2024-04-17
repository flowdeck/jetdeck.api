import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import router from './router'

const app = express()
const port = 8090

//* Init DotEnv
dotenv.config()

app.use(
  cors({
    credentials: true,
  }),
)

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json('Jetdeck API Root')
})

// Define the route for GET requests to "/users"
app.get('/users', (req, res) => {
  //* TODO
})

const server = http.createServer(app)

server.listen(port, () => {
  console.log(`Server running on localhost:${port}`)
})

//* DB Config
const dbConfig = {
  HOST: '127.0.0.1',
  PORT: 27017,
  DB: 'jetdeck',
}

const MongoURL = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`

mongoose.Promise = Promise
mongoose.connect(MongoURL).then(() => {
  console.log('Connected to MongoDB')
})

mongoose.connection.on('error', (error: Error) => console.log(error))

app.use('/', router())
