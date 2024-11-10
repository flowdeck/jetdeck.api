// googleAPIsGmail.js

// STEP 1:
// http://localhost:8090/googleapis-gmail/get-refresh-token

import express from 'express'
import { google } from 'googleapis'

import nodemailer from 'nodemailer'
import base64url from 'base64url'
import { PassThrough } from 'stream'

const router = express.Router()

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI,
)

// Store refresh tokens (in-memory - NOT FOR PRODUCTION)
const refreshTokens = {}

// Route to initiate the OAuth flow
router.get('/get-refresh-token', (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/gmail.send'],
  })

  res.redirect(authUrl)
})

// Callback route to handle the authorization code and get the refresh token
router.get('/auth/google/callback', async (req, res) => {
  let code = req.query.code

  if (!code) {
    code = '4%2F0AeanS0bEX1un1JeqcHyGjHjI0EzReqQYTLudEHY8CNGbBZ8H15Uyvnc3kLOliC-NDctdnQ'
  }

  try {
    const { tokens } = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(tokens)

    console.log('Refresh token:', tokens.refresh_token)

    // *** IMPORTANT ***
    // Replace this with a secure token storage mechanism (e.g., database)
    // and associate the token with a user identifier.
    // Here's an example using an in-memory store (NOT FOR PRODUCTION)
    if (tokens.id_token) {
      const ticket = await oauth2Client.verifyIdToken({
        idToken: tokens.id_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      })
      const payload = ticket.getPayload()
      const userId = payload?.sub // Get user ID from the ID token

      if (userId) {
        refreshTokens[userId] = tokens.refresh_token
      } else {
        console.error('Error: No user ID found in ID token')
      }
    } else {
      console.error('Error: No ID token found')
    }

    res.send('Refresh token obtained and stored! You can close this window now.')
  } catch (error) {
    console.error('Error getting tokens:', error)
    res.status(500).send('Error getting tokens')
  }
})

// Example route to send an email (requires a refresh token)
router.get('/send-email_OLD', async (req, res) => {
  // // 1. Get the user ID (however you identify users in your app)
  // const userId = req.body.userId // Assuming you send the userId in the request body

  // // 2. Retrieve the refresh token for the user
  // const refreshToken = refreshTokens[userId]

  const refreshToken =
    '1//06ydEYQn5MGvMCgYIARAAGAYSNwF-L9IrZp5o-YNx08S8tLOniAqVUNyFrmGoU1X7Rlb6kKWk-IMa619YTisLbqKSj9BzxzuuoQo'

  if (!refreshToken) {
    return res.status(401).send('Unauthorized: No refresh token found for this user.')
  }

  try {
    // 3. Set the credentials with the refresh token
    oauth2Client.setCredentials({ refresh_token: refreshToken })

    // 4. Create a new Gmail client
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client })

    // 5. Construct the email message (see Gmail API documentation for details)
    const message = `
      Content-Type: text/plain; charset="UTF-8"
      MIME-Version: 1.0
      to: gashton@flowdeck.com 
      from: me
      subject: Your Subject

      This is the body of your email.
      `

    // 6. Send the email
    const result = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: Buffer.from(message).toString('base64'), // Now 'message' is a string
      },
    })

    res.send('Email sent successfully!')
  } catch (error) {
    console.error('Error sending email:', error)
    res.status(500).send('Error sending email')
  }
})

router.get('/send-email', async (req, res) => {
  const refreshToken = '4%2F0AeanS0bEX1un1JeqcHyGjHjI0EzReqQYTLudEHY8CNGbBZ8H15Uyvnc3kLOliC-NDctdnQ'

  if (!refreshToken) {
    return res.status(401).send('Unauthorized: No refresh token found for this user.')
  }

  try {
    oauth2Client.setCredentials({ refresh_token: refreshToken })
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client })

    const transporter = nodemailer.createTransport({
      streamTransport: true,
      newline: 'unix',
      buffer: true,
    })

    const message = {
      from: 'me',
      to: 'gashton@flowdeck.com',
      subject: 'Your Subject',
      text: 'This is the body of your email.',
    }

    let emailContent = ''

    // Resolve the nested Promises to get the actual stream
    const mailStream = await await transporter.sendMail(message)

    // Create a PassThrough stream to accumulate email content
    const emailContentStream = new PassThrough()

    emailContentStream.on('data', (chunk) => {
      emailContent += chunk
    })

    // Pipe the mailStream to the emailContentStream
    mailStream.pipe(emailContentStream)

    await new Promise((resolve, reject) => {
      emailContentStream.on('end', resolve)
      emailContentStream.on('error', reject)
    })

    const encodedMessage = base64url(emailContent)

    const result = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    })

    res.send('Email sent successfully!')
  } catch (error) {
    console.error('Error sending email:', error)
    res.status(500).send('Error sending email')
  }
})

router.get('/send-email-2', async (req, res) => {
  const refreshToken = '4%2F0AeanS0bEX1un1JeqcHyGjHjI0EzReqQYTLudEHY8CNGbBZ8H15Uyvnc3kLOliC-NDctdnQ'

  try {
    // 1. Create a new OAuth2 client with the refresh token
    const myOAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI,
    )

    myOAuth2Client.setCredentials({ refresh_token: refreshToken })

    // 2. Obtain an access token
    const { token } = await myOAuth2Client.getAccessToken()

    // 3. Create the transporter with OAuth2 settings
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'gashton@flowdeck.com',
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: refreshToken,
        accessToken: token,
      },
    })

    // 3. Define the email options
    const mailOptions = {
      // from: 'gashton@flowdeck.com',
      to: 'gashton@flowdeck.com', // Recipient email address
      subject: 'Hello',
      text: 'Hello world?',
    }

    // 4. Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error)
        res.status(500).send('Error sending email')
      } else {
        console.log('Message sent: %s', info.messageId)
        res.send('Email sent successfully!')
      }
    })
  } catch (error) {
    console.error('Error obtaining access token or sending email:', error)
    res.status(500).send('Error sending email')
  }
})

export { router as googleAPIsGmail }
