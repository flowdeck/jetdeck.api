import mongoose from 'mongoose'
import legSchema from './schemas/leg.schema.js'

const tripRequestSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  legs: [legSchema], // Embed the legSchema as before
  status: {
    type: String,
    enum: ['pending', 'quoted', 'booked', 'canceled'],
    default: 'pending',
  },
  // ... other fields as needed
})

const TripRequest = mongoose.model('tripRequest', tripRequestSchema)

export default TripRequest
