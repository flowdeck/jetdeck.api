import ScheduledTransaction from '../../models/_Finance/scheduledTransaction.model.js'

const scheduledTransactionController = {}

// Create a new scheduled transaction
scheduledTransactionController.createScheduledTransaction = async (req, res) => {
  try {
    const scheduledTransactionData = req.body
    const scheduledTransaction = await ScheduledTransaction.create(scheduledTransactionData)
    res.status(201).json(scheduledTransaction)
  } catch (err) {
    const errResp = handleErrorObj(err)
    console.log(errResp)
    res.status(400).json(errResp)
  }
}

// Get a specific scheduled transaction by ID
scheduledTransactionController.getScheduledTransaction = async (req, res) => {
  try {
    const scheduledTransactionId = req.params.id

    if (!scheduledTransactionId) {
      return res.status(400).json({ errorMessage: 'Please provide a scheduled transaction ID' })
    }

    const scheduledTransaction = await ScheduledTransaction.findById(scheduledTransactionId)

    if (!scheduledTransaction) {
      return res.status(404).json({ errorMessage: 'Scheduled transaction not found' })
    }

    res.status(200).json(scheduledTransaction)
  } catch (err) {
    const errResp = handleErrorObj(err)
    console.log(errResp)
    res.status(500).json(errResp)
  }
}

// Update an existing scheduled transaction
scheduledTransactionController.updateScheduledTransaction = async (req, res) => {
  try {
    const scheduledTransactionId = req.params.id
    const updatedScheduledTransactionData = req.body

    if (!scheduledTransactionId) {
      return res.status(400).json({ errorMessage: 'Please provide a scheduled transaction ID' })
    }

    const updatedScheduledTransaction = await ScheduledTransaction.findByIdAndUpdate(
      scheduledTransactionId,
      updatedScheduledTransactionData,
      { new: true },
    )

    if (!updatedScheduledTransaction) {
      return res.status(404).json({ errorMessage: 'Scheduled transaction not found' })
    }

    res.status(200).json(updatedScheduledTransaction)
  } catch (err) {
    const errResp = handleErrorObj(err)
    console.log(errResp)
    res.status(500).json(errResp)
  }
}

// Delete a scheduled transaction
scheduledTransactionController.deleteScheduledTransaction = async (req, res) => {
  try {
    const scheduledTransactionId = req.params.id

    if (!scheduledTransactionId) {
      return res.status(400).json({ errorMessage: 'Please provide a scheduled transaction ID' })
    }

    const deletedScheduledTransaction = await ScheduledTransaction.findByIdAndDelete(scheduledTransactionId)

    if (!deletedScheduledTransaction) {
      return res.status(404).json({ errorMessage: 'Scheduled transaction not found' })
    }

    res.status(200).json({ message: 'Scheduled transaction deleted successfully' })
  } catch (err) {
    const errResp = handleErrorObj(err)
    console.log(errResp)
    res.status(500).json(errResp)
  }
}

// Get all scheduled transactions
scheduledTransactionController.getAllScheduledTransactions = async (req, res) => {
  try {
    const scheduledTransactions = await ScheduledTransaction.find()
    res.status(200).json(scheduledTransactions)
  } catch (err) {
    const errResp = handleErrorObj(err)
    console.log(errResp)
    res.status(500).json(errResp)
  }
}

// Error handling function (you might want to adjust this)
const handleErrorObj = (errObj) => {
  if (errObj.message) {
    return { errorMessage: errObj.message }
  } else {
    return { errorMessage: 'An error occurred' }
  }
}

export default scheduledTransactionController
