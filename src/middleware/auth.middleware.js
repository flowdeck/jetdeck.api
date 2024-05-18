import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/user.model.js'

// Load environment variables
dotenv.config()

const requireAuth = (req, res, next) => {
  // 1. Get Authorization Header
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' })
  }

  // 2. Extract Token (Assuming Bearer scheme)
  const token = authHeader.split(' ')[1] // Bearer <token>

  // 3. Verify Token
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      console.error(err.message)
      return res.status(401).json({ message: 'Unauthorized: Invalid token' })
    } else {
      req.user = decodedToken // Attach user to request
      next()
    }
  })
}

// Check for and store authenticated user information
const populateUser = async (req, res, next) => {
  // Check if a JWT token is present in cookies
  const token = req.cookies.jwt

  if (token) {
    try {
      // Verify the JWT token using a secret key
      const decodedToken = await jwt.verify(token, process.env.JWT_SECRET)

      // Find the user associated with the decoded token ID
      const user = await User.findById(decodedToken.id)

      // Store the user object (if found) in response locals
      res.locals.user = user
    } catch (error) {
      console.error('Error verifying JWT token:', error.message)
      // Set user to null on verification error
      res.locals.user = null
    }
  } else {
    // No token found, set user to null
    res.locals.user = null
  }

  // Continue processing the request (next middleware or route handler)
  next()
}

export { requireAuth, populateUser }
