import mongoose from 'mongoose'

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['TODO', 'In Progress', 'Done'],
    default: 'TODO',
  },
  percentageComplete: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
})

const Ticket = mongoose.model('Ticket', ticketSchema)

export default Ticket
