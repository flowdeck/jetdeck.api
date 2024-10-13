import { Router } from 'express'
import ticketController from '../controllers/_Jetdeck/ticket.controller.js'

const router = Router()

// Create a new ticket
router.post('/', ticketController.createTicket)

// Get a specific ticket by ID
router.get('/:id', ticketController.getTicket)

// Update an existing ticket
router.put('/:id', ticketController.updateTicket)

// Delete a ticket
router.delete('/:id', ticketController.deleteTicket)

// Get all tickets
router.get('/', ticketController.getAllTickets)

export default router
