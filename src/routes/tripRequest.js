import { Router } from 'express'
import tripRequestController from '../controllers/tripRequest.controller.js'

const router = Router()

// Create a new trip request
router.post('/', tripRequestController.createTripRequest)

// Get a specific trip request by ID
router.get('/:id', tripRequestController.getTripRequest)

// Update an existing trip request
router.put('/:id', tripRequestController.updateTripRequest)

// Delete a trip request
router.delete('/:id', tripRequestController.deleteTripRequest)

// Get all trip requests
router.get('/', tripRequestController.getAllTripRequests)

export default router
