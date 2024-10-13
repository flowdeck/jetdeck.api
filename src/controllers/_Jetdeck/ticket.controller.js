import Ticket from '../../models/tickets/ticket.model.js'

const ticketController = {}

// Create a new ticket
ticketController.createTicket = async (req, res) => {
  const { title, description } = req.body

  try {
    const ticket = await Ticket.create({ title, description })
    res.status(201).json(ticket)
  } catch (err) {
    const errResp = handleErrorObj(err)
    console.log(errResp)
    res.status(400).json(errResp)
  }
}

// Get a specific ticket by ID
ticketController.getTicket = async (req, res) => {
  try {
    const ticketId = req.params.id

    if (!ticketId) {
      return res.status(400).json({ errorMessage: 'Please provide a ticket ID' })
    }

    const ticket = await Ticket.findById(ticketId)

    if (!ticket) {
      return res.status(404).json({ errorMessage: 'Ticket not found' })
    }

    res.status(200).json(ticket)
  } catch (err) {
    const errResp = handleErrorObj(err)
    console.log(errResp)
    res.status(500).json(errResp)
  }
}

// Update an existing ticket
ticketController.updateTicket = async (req, res) => {
  try {
    const ticketId = req.params.id
    const { title, description, status, percentageComplete } = req.body

    if (!ticketId) {
      return res.status(400).json({ errorMessage: 'Please provide a ticket ID' })
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(
      ticketId,
      { title, description, status, percentageComplete },
      { new: true }, // Return the updated ticket
    )

    if (!updatedTicket) {
      return res.status(404).json({ errorMessage: 'Ticket not found' })
    }

    res.status(200).json(updatedTicket)
  } catch (err) {
    const errResp = handleErrorObj(err)
    console.log(errResp)
    res.status(500).json(errResp)
  }
}

// Delete a ticket
ticketController.deleteTicket = async (req, res) => {
  try {
    const ticketId = req.params.id

    if (!ticketId) {
      return res.status(400).json({ errorMessage: 'Please provide a ticket ID' })
    }

    const deletedTicket = await Ticket.findByIdAndDelete(ticketId)

    if (!deletedTicket) {
      return res.status(404).json({ errorMessage: 'Ticket not found' })
    }

    res.status(202).json({ message: 'Ticket deleted successfully' })
  } catch (err) {
    const errResp = handleErrorObj(err)
    console.log(errResp)
    res.status(500).json(errResp)
  }
}

// Get all tickets (you might want to add pagination or filtering later)
ticketController.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
    res.status(200).json(tickets)
  } catch (err) {
    const errResp = handleErrorObj(err)
    console.log(errResp)
    res.status(500).json(errResp)
  }
}

// Error handling function (you can reuse the one from auth.controller.js)
const handleErrorObj = (errObj) => {
  if (errObj.message) {
    return { errorMessage: errObj.message }
  } else {
    return { errorMessage: 'An error occurred' }
  }
}

export default ticketController
