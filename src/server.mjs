// const express = require('express')
// const mongoose = require('mongoose')
// const authRoutes = require('./routes/auth.routes')

import express from 'express'
import mongoose from 'mongoose'
import authRoutes from './routes/auth.routes.mjs'
// import { authRoutes } from './routes/auth.routes'
// import * as authRoutes from './routes/auth.routes'
// import * as authRoutes from './routes/auth.routes.mjs'

// import * as authRoutes from './routes/auth.routes.mjs'

const app = express()

//* Constants
const dbURI = 'mongodb://localhost:27017/jetdeck'
const port = 8090

//* Middleware
app.use(express.static('public'))
app.use(express.json()) //* Parse JSON bodies

// view engine
// app.set('view engine', 'ejs');

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
app.get('/', (req, res) => {
  res.send('Jetdeck API Root')
})

//* Import and mount the routes
app.use('/auth', authRoutes)
