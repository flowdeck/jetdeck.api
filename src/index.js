import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes.js'
import ticketRoutes from './routes/ticket.routes.js' // Import the ticket routes
import { requireAuth, populateUser } from './middleware/auth.middleware.js'
import cors from 'cors'
import { googleAPIsGmail } from './services/googleapis/googleAPIsGmail.js'

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
  res.send('Jetdeck API Root')
})

app.get('/dashboard', requireAuth, (req, res) => {
  res.send('Authenticated route: Dashboard')
})

// Import and mount the routes
app.use('/auth', authRoutes)
app.use('/tickets', ticketRoutes)
app.use('/googleapis-gmail', googleAPIsGmail)
// app.use('/', requireAuth, airportRoutes)

//* Google API - Send Email - TESTING

// // Create the oauth2Client ONCE, outside the route handlers
// const oauth2Client = new google.auth.OAuth2(
//   process.env.GOOGLE_CLIENT_ID,
//   process.env.GOOGLE_CLIENT_SECRET,
//   process.env.GOOGLE_REDIRECT_URI,
// )

// app.get('/get-refresh-token', (req, res) => {
//   const authUrl = oauth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: ['https://www.googleapis.com/auth/gmail.send'],
//   })

//   res.redirect(authUrl)
// })

// app.get('/auth/google/callback', async (req, res) => {
//   const code = req.query.code;

//   try {
//     const { tokens } = await oauth2Client.getToken(code);
//     oauth2Client.setCredentials(tokens);

//     // **IMPORTANT:** Store the `tokens.refresh_token` securely!
//     console.log('Refresh token:', tokens.refresh_token);

//     // Store the refresh token. Here's an example using a simple in-memory store:
//     global.refreshTokens = global.refreshTokens || {};
//     global.refreshTokens[/* some user identifier, maybe from tokens */] = tokens.refresh_token;

//     res.send('Refresh token obtained and stored! You can close this window now.');
//   } catch (error) {
//     console.error('Error getting tokens:', error);
//     res.status(500).send('Error getting tokens');
//   }
// });

// app.get('/oauth2callback', async (req, res) => {
//   // const code = req.query.code
//   //GET THIS CODE FROM CALLING "/get-refresh-token" from a browser loggged into Flowdeck.
//   //Then run this route and it will put the refresh token in the console (server console)
//   const code = '4/0AVG7fiR9cOZRc7MBTAx_aBNd7NZO67f55-jCQYZ4DpoqiUye5BxatRXzKhBRcczp-uXgGg'

//   try {
//     const { tokens } = await oauth2Client.getToken(code)
//     oauth2Client.setCredentials(tokens)

//     // **IMPORTANT:** Store the `tokens.refresh_token` securely!
//     console.log('Refresh token:', tokens.refresh_token)

//     res.send('Refresh token obtained and stored! You can close this window now.')
//   } catch (error) {
//     console.error('Error getting tokens:', error)
//     res.status(500).send('Error getting tokens')
//   }
// })

// app.get('/send-test-email-1', async (req, res) => {
//   try {
//     // Set credentials (replace with your actual credentials)
//     oauth2Client.setCredentials({
//       refresh_token:
//         '1//06cLr6t-c_358CgYIARAAGAYSNwF-L9IrHMqpI-Hi5SDdhhTjRO8GTdx0wb-Qzbtzqg3okVdkCU7vmF0q6Dr6Rj6p_IseIJCXnJs',
//     })

//     const gmail = google.gmail({ version: 'v1', auth: oauth2Client })

//     const message = {
//       to: 'gashton@flowdeck.com', // Replace with the recipient email
//       subject: 'Test email from Flowdeck',
//       text: 'This is a test email sent from your Node.js server.',
//     }

//     const encodedMessage = Buffer.from(JSON.stringify(message)).toString('base64')

//     gmail.users.messages
//       .send({
//         userId: 'me',
//         requestBody: {
//           raw: encodedMessage,
//         },
//       })
//       .then((response) => {
//         // Add this .then block
//         if (response.status !== 200) {
//           console.error('Gmail API Error:', response.data)
//           res.status(500).send('Error sending email: ' + JSON.stringify(response.data)) // Include error details in response
//         } else {
//           res.send('Test email sent successfully!')
//         }
//       })
//       .catch((error) => {
//         console.error('Error sending email:', error)
//         res.status(500).send('Error sending email: ' + error.message)
//         // Include error message in response
//       })
//   } catch (error) {
//     console.error('Error sending email:', error)
//     res.status(500).send('Error sending email: ' + error.message) // Include error message in response
//   }
// })

// app.get('/send-test-email', async (req, res) => {
//   try {
//     // Set credentials (replace with your actual credentials)
//     oauth2Client.setCredentials({
//       refresh_token:
//         '1//06cLr6t-c_358CgYIARAAGAYSNwF-L9IrHMqpI-Hi5SDdhhTjRO8GTdx0wb-Qzbtzqg3okVdkCU7vmF0q6Dr6Rj6p_IseIJCXnJs',
//     })

//     const gmail = google.gmail({ version: 'v1', auth: oauth2Client })

//     const rawEmail = `
//       To: gashton@flowdeck.com
//       From: your-email@example.com
//       Subject: Test email from Flowdeck
//       Date: ${new Date().toUTCString()}

//       This is a test email sent from your Node.js server.
//     `

//     const encodedMessage = Buffer.from(rawEmail).toString('base64url')

//     gmail.users.messages
//       .send({
//         userId: 'me',
//         requestBody: {
//           raw: encodedMessage,
//         },
//       })
//       .then((response) => {
//         // Add this .then block
//         if (response.status !== 200) {
//           console.error('Gmail API Error:', response.data)
//           res.status(500).send('Error sending email: ' + JSON.stringify(response.data)) // Include error details in response
//         } else {
//           res.send('Test email sent successfully!')
//         }
//       })
//       .catch((error) => {
//         console.error('Error sending email:', error)
//         res.status(500).send('Error sending email: ' + error.message)
//         // Include error message in response
//       })
//   } catch (error) {
//     console.error('Error sending email:', error)
//     res.status(500).send('Error sending email: ' + error.message) // Include error message in response
//   }
// })
