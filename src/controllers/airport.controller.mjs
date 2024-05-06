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

    const airports = await Airport.find(query)

    if (!airports || airports.length === 0) {
      // Decide which response you prefer for the case of no matches
      return res.status(404).json({ message: 'No airports found' })
      // OR
      // return res.status(200).json([]);
    }

    res.status(200).json(airports)
  } catch (error) {
    console.error('Error fetching airports:', error)
    res.status(500).json({ message: 'Error fetching airports' }) // Generic error message
  }
}

export default airportController
