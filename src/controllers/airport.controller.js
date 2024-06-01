import dotenv from 'dotenv'
import Airport from '../models/airport.model.js'

// Load environment variables
dotenv.config()

const airportController = {}

airportController.getAirports = async (req, res, searchTerm) => {
  try {
    // Validation
    if (searchTerm && searchTerm.length < 2) {
      return res.status(400).json({ message: 'Search term must be at least 2 characters long' })
    }

    const query = searchTerm ? { name: { $regex: new RegExp('^' + searchTerm, 'i') } } : {} // If no searchTerm, query all airports

    // Return specific fields
    const airports = await Airport.find(query).select('id icao iata name city state').limit(20) // Limit to 20 results

    res.status(200).json(airports)
  } catch (error) {
    console.error('Error fetching airports:', error)
    res.status(500).json({ message: 'Error fetching airports' }) // Generic error message
  }
}

export default airportController
