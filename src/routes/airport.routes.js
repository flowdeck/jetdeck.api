import { Router } from 'express'
import airportController from '../controllers/airport.controller.js'

const router = Router()

const returnMochError = true

if (returnMochError) {
  router.get('/airports', (req, res) => {
    // Simulate an error scenario
    const mockError = {
      status: 500, // Internal Server Error (or another appropriate code)
      message: 'Error fetching airports data',
    }

    res.status(mockError.status).json(mockError) // Return the error as JSON
  })
} else {
  router.get('/airports', (req, res) => airportController.getAirports(req, res))
}

router.get(
  '/airports',
  (req, res) => airportController.getAirports(req, res, req.query.t), // Pass 't' parameter
)

export default router
