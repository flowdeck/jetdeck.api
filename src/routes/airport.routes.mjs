import { Router } from 'express'
import airportController from '../controllers/airport.controller.mjs'

const router = Router()

router.get('/airports', (req, res) => airportController.getAirports(req, res))

export default router
