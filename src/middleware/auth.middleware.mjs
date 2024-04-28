import jwt from 'jsonwebtoken'

//require auth
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'net ninja secret', (err, decodedToken) => {
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

export default requireAuth
