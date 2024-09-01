import mongoose from 'mongoose'

const legSchema = new mongoose.Schema({
  departureAirport: {
    type: String,
    required: [true, 'Departure airport is required'],
  },
  arrivalAirport: {
    type: String,
    required: [true, 'Arrival airport is required'],
  },
  desiredDepartureDateTime: {
    type: Date,
    //TODO - Add validation for valid date/time
  },
  departureTimeOfDay: {
    // If they haven't specified a precise time
    type: String,
    enum: ['morning', 'noon', 'afternoon', 'evening'],
  },
  // ...other potential fields: aircraft preferences, passenger count, etc.
})

// You only need to export the schema here
export default legSchema
