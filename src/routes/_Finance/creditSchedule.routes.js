import { Router } from 'express'
import creditScheduleController from '../../controllers/_Finance/creditSchedule.controller.js'

const router = Router()

// Create a new credit schedule
router.post('/', creditScheduleController.createCreditSchedule)

// Get a specific credit schedule by ID
router.get('/:id', creditScheduleController.getCreditSchedule)

// Update an existing credit schedule
router.put('/:id', creditScheduleController.updateCreditSchedule)

// Delete a credit schedule
router.delete('/:id', creditScheduleController.deleteCreditSchedule)

// Get all credit schedules
router.get('/', creditScheduleController.getAllCreditSchedules)

export default router
