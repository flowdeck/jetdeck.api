import mongoose from 'mongoose'

const airportSchema = new mongoose.Schema({
  icao: String,
  iata: String,
  name: String,
})

const Airport = mongoose.model('airport', airportSchema)

export default Airport
