import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes.js'
import airportRoutes from './routes/airport.routes.js'
import ticketRoutes from './routes/ticket.routes.js'
import scheduledTransactionRoutes from './routes/_Finance/scheduledTransactions.routes.js'
import { requireAuth, populateUser } from './middleware/auth.middleware.js'
import cors from 'cors'

const app = express()

// Constants
const dbURI = process.env.MONGODB_URI
const port = 8090

// Middleware
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())

const corsOptions = {
  origin: ['http://localhost:8080', 'https://app.flowdeck.com'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: 'GET,POST,OPTIONS,PUT,DELETE',
}

app.use(cors(corsOptions))

async function startServer() {
  try {
    await mongoose.connect(dbURI, {})
    console.log('Connected to MongoDB')

    app.listen(port, (err) => {
      if (err) {
        console.error('Error in server setup:', err)
        return
      }
      console.log('Server listening on Port', port)
    })
  } catch (err) {
    console.error('Error starting server:', err)
    process.exit(1)
  }
}

startServer()

// routes
app.get('*', populateUser)

app.get('/', (req, res) => {
  res.send('Flowdeck.Finance API Root')
})

app.get('/dashboard', requireAuth, (req, res) => {
  res.send('Authenticated route: Dashboard')
})

// Import and mount the routes
app.use('/auth', authRoutes)
app.use('/tickets', ticketRoutes)
// app.use('/credit-schedule', CreditScheduleRoutes)
app.use('/', requireAuth, airportRoutes)
app.use('/scheduled-transactions', scheduledTransactionRoutes)
