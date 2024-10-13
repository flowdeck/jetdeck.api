import CreditSchedule from '../../models/creditSchedule.model.js'

const creditScheduleController = {}

// Create a new credit schedule
creditScheduleController.createCreditSchedule = async (req, res) => {
  try {
    const creditScheduleData = req.body
    const creditSchedule = await CreditSchedule.create(creditScheduleData)
    res.status(201).json(creditSchedule)
  } catch (err) {
    const errResp = handleErrorObj(err)
    console.log(errResp)
    res.status(400).json(errResp)
  }
}

// Get a specific credit schedule by ID
creditScheduleController.getCreditSchedule = async (req, res) => {
  try {
    const creditScheduleId = req.params.id

    if (!creditScheduleId) {
      return res.status(400).json({ errorMessage: 'Please provide a credit schedule ID' })
    }

    const creditSchedule = await CreditSchedule.findById(creditScheduleId)

    if (!creditSchedule) {
      return res.status(404).json({ errorMessage: 'Credit schedule not found' })
    }

    res.status(200).json(creditSchedule)
  } catch (err) {
    const errResp = handleErrorObj(err)
    console.log(errResp)
    res.status(500).json(errResp)
  }
}

// Update an existing credit schedule
creditScheduleController.updateCreditSchedule = async (req, res) => {
  try {
    const creditScheduleId = req.params.id
    const updatedCreditScheduleData = req.body

    if (!creditScheduleId) {
      return res.status(400).json({ errorMessage: 'Please provide a credit schedule ID' })
    }

    const updatedCreditSchedule = await CreditSchedule.findByIdAndUpdate(creditScheduleId, updatedCreditScheduleData, {
      new: true,
    })

    if (!updatedCreditSchedule) {
      return res.status(404).json({ errorMessage: 'Credit schedule not found' })
    }

    res.status(200).json(updatedCreditSchedule)
  } catch (err) {
    const errResp = handleErrorObj(err)
    console.log(errResp)
    res.status(500).json(errResp)
  }
}

// Delete a credit schedule
creditScheduleController.deleteCreditSchedule = async (req, res) => {
  try {
    const creditScheduleId = req.params.id

    if (!creditScheduleId) {
      return res.status(400).json({ errorMessage: 'Please provide a credit schedule ID' })
    }

    const deletedCreditSchedule = await CreditSchedule.findByIdAndDelete(creditScheduleId)

    if (!deletedCreditSchedule) {
      return res.status(404).json({ errorMessage: 'Credit schedule not found' })
    }

    res.status(200).json({ message: 'Credit schedule deleted successfully' })
  } catch (err) {
    const errResp = handleErrorObj(err)
    console.log(errResp)
    res.status(500).json(errResp)
  }
}

// Get all credit schedules
creditScheduleController.getAllCreditSchedules = async (req, res) => {
  try {
    const creditSchedules = await CreditSchedule.find()
    res.status(200).json(creditSchedules)
  } catch (err) {
    const errResp = handleErrorObj(err)
    console.log(errResp)
    res.status(500).json(errResp)
  }
}

// Error handling function
const handleErrorObj = (errObj) => {
  if (errObj.message) {
    return { errorMessage: errObj.message }
  } else {
    return { errorMessage: 'An error occurred' }
  }
}

export default creditScheduleController
