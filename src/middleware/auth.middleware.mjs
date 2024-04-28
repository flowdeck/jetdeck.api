import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

//require auth
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message)
        return res.status(401).json({ message: 'Unauthorized' }) // Return 401 with error message
      } else {
        req.user = decodedToken // Attach decoded user information to request (optional)
        next()
      }
    })
  } else {
    return res.status(401).json({ message: 'Unauthorized' }) // Return 401 if no token exist
  }
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
