import { Router } from 'express'
import airportController from '../controllers/airport.controller.js'

const router = Router()

// router.get('/airports', (req, res) => airportController.getAirports(req, res))
router.get(
  '/airports',
  (req, res) => airportController.getAirports(req, res, req.query.t), // Pass 't' parameter
)

export default router
