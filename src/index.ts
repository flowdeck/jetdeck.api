import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import mongoose from 'mongoose'

const app = express()
const port = 8090

app.use(cors({
    credentials: true
}))

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

// Define the route for GET requests to "/users"
app.get('/users', (req, res) => {
    let users = ['user1', 'user2']
    res.json(users)
  })

const server = http.createServer(app)

server.listen(port, () => {
    console.log(`Server running on localhost:${port}`)
})

//* DB Config
const dbConfig = {
    HOST: '127.0.0.1',
    PORT: 27017,
    DB: 'flowdeck'
}

const MongoURL = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`

mongoose.Promise = Promise
mongoose.connect(MongoURL).then(() => {
    console.log('Connected to MongoDB')
})

mongoose.connection.on('error', (error: Error) => console.log(error))