import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from '../src/models/user.model.js'

dotenv.config()

const adminUser = {
  username: 'admin',
  password: '1234',
}

async function seedUser() {
  try {
    // MongoDB Connection
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')

    // Check if user already exists
    const existingUser = await User.findOne({ username: adminUser.username })
    if (existingUser) {
      console.log('User already exists. Skipping seeding.')
      return
    }

    // Create user (without hashing the password yet)
    const newUser = new User({
      username: adminUser.username,
      password: adminUser.password,
    })

    // Save user (triggering the pre-save middleware for hashing)
    await newUser.save()

    console.log('User seeded successfully:', newUser)
  } catch (error) {
    console.error('Error seeding user:', error)
  } finally {
    mongoose.disconnect()
  }
}

seedUser()
