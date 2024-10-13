import { Router } from 'express'
import scheduledTransactionController from '../../controllers/_Finance/scheduledTransaction.controller.js'

const router = Router()

// Create a new scheduled transaction (credit or debit)
router.post('/', scheduledTransactionController.createScheduledTransaction)

// Get a specific scheduled transaction by ID
router.get('/:id', scheduledTransactionController.getScheduledTransaction)

// Update an existing scheduled transaction
router.put('/:id', scheduledTransactionController.updateScheduledTransaction)

// Delete a scheduled transaction
router.delete('/:id', scheduledTransactionController.deleteScheduledTransaction)

// Get all scheduled transactions
router.get('/', scheduledTransactionController.getAllScheduledTransactions)

export default router
