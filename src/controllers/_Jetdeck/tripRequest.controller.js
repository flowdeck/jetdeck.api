import TripRequest from '../../models/tripRequest.model.js'

const tripRequestController = {}

// Create a new trip request
tripRequestController.createTripRequest = async (req, res) => {
  // Assuming your request body contains all the necessary TripRequest data
  const tripRequestData = req.body

  try {
    const tripRequest = await TripRequest.create(tripRequestData)
    res.status(201).json(tripRequest)
  } catch (err) {
    const errResp = handleErrorObj(err)
    console.log(errResp)
    res.status(400).json(errResp)
  }
}

// Get a specific trip request by ID
tripRequestController.getTripRequest = async (req, res) => {
  try {
    const tripRequestId = req.params.id

    if (!tripRequestId) {
      return res.status(400).json({ errorMessage: 'Please provide a trip request ID' })
    }

    const tripRequest = await TripRequest.findById(tripRequestId)

    if (!tripRequest) {
      return res.status(404).json({ errorMessage: 'Trip request not found' })
    }

    res.status(200).json(tripRequest)
  } catch (err) {
    const errResp = handleErrorObj(err)
    console.log(errResp)
    res.status(500).json(errResp)
  }
}

// Update an existing trip request
tripRequestController.updateTripRequest = async (req, res) => {
  try {
    const tripRequestId = req.params.id
    const updatedTripRequestData = req.body // Assuming your request body contains the updated data

    if (!tripRequestId) {
      return res.status(400).json({ errorMessage: 'Please provide a trip request ID' })
    }

    const updatedTripRequest = await TripRequest.findByIdAndUpdate(
      tripRequestId,
      updatedTripRequestData,
      { new: true }, // Return the updated trip request
    )

    if (!updatedTripRequest) {
      return res.status(404).json({ errorMessage: 'Trip request not found' })
    }

    res.status(200).json(updatedTripRequest)
  } catch (err) {
    const errResp = handleErrorObj(err)
    console.log(errResp)
    res.status(500).json(errResp)
  }
}

// Delete a trip request
tripRequestController.deleteTripRequest = async (req, res) => {
  try {
    const tripRequestId = req.params.id

    if (!tripRequestId) {
      return res.status(400).json({ errorMessage: 'Please provide a trip request ID' })
    }

    const deletedTripRequest = await TripRequest.findByIdAndDelete(tripRequestId)

    if (!deletedTripRequest) {
      return res.status(404).json({ errorMessage: 'Trip request not found' })
    }

    res.status(200).json({ message: 'Trip request deleted successfully' })
  } catch (err) {
    const errResp = handleErrorObj(err)
    console.log(errResp)
    res.status(500).json(errResp)
  }
}

// Get all trip requests
tripRequestController.getAllTripRequests = async (req, res) => {
  try {
    const tripRequests = await TripRequest.find()
    res.status(200).json(tripRequests)
  } catch (err) {
    const errResp = handleErrorObj(err)
    console.log(errResp)
    res.status(500).json(errResp)
  }
}

// Error handling function (reuse from ticket.controller.js or auth.controller.js)
const handleErrorObj = (errObj) => {
  if (errObj.message) {
    return { errorMessage: errObj.message }
  } else {
    return { errorMessage: 'An error occurred' }
  }
}

export default tripRequestController
