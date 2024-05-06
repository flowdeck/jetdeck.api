import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes.js'
import airportRoutes from './routes/airport.routes.js'
import { requireAuth, populateUser } from './middleware/auth.middleware.mjs'
import cors from 'cors'

const app = express()

//* Constants
const dbURI = 'mongodb://localhost:27017/jetdeck'
const port = 8090

//* Middleware
app.use(express.static('public'))
app.use(express.json()) //* Parse JSON bodies
app.use(cookieParser()) //* Parse cookies

const corsOptions = {
  origin: ['http://localhost:8080'], //* Allow requests from this origin
  credentials: true, //* Include cookies in requests (if applicable)
  allowedHeaders: ['Content-Type', 'Authorization'], //* Allowed headers
  methods: 'GET,POST,OPTIONS,PUT,DELETE', //* Allowed methods
}

app.use(cors(corsOptions))

async function startServer() {
  try {
    //* Connect to MongoDB
    await mongoose.connect(dbURI, {})
    console.log('Connected to MongoDB')

    //* Start the server
    app.listen(port, (err) => {
      if (err) {
        console.error('Error in server setup:', err)
        return //* Exit early on error
      }
      console.log('Server listening on Port', port)
    })
  } catch (err) {
    console.error('Error starting server:', err)
    process.exit(1) //* Exit the process with an error code
  }
}

//* Start the server
startServer()

// routes
app.get('*', populateUser)

app.get('/', (req, res) => {
  res.send('Jetdeck API Root')
})

//* Authenticated route
app.get('/dashboard', requireAuth, (req, res) => {
  res.send('Authenticated route: Dashboard')
})

//* Import and mount the routes
app.use('/auth', authRoutes)
app.use('/', requireAuth, airportRoutes)
