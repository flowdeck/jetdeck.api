import User from '../models/user.model.mjs'

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code)
  let errors = { username: '', password: '' }

  // duplicate username error
  if (err.code === 11000) {
    errors.username = 'that username is already registered'
    return errors
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message
    })
  }

  return errors
}

const authController = {}

authController.signup_post = async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.create({ username, password })
    res.status(201).json(user)
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({ errors })
  }
}

authController.login_post = async (req, res) => {
  const { username, password } = req.body

  console.log(username, password)
  res.send('user login')
}

export default authController
