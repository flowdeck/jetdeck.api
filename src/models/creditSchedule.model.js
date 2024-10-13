import mongoose from 'mongoose'

const creditScheduleSchema = new mongoose.Schema({
  incomeSource: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  frequency: {
    type: String,
    enum: ['weekly', 'bi-weekly', 'monthly'],
    required: true,
  },
  startDate: {
    type: Date,
    default: () => {
      const today = new Date()
      today.setHours(0, 0, 0, 0) // Set time to 12 AM
      return today
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
})

const CreditSchedule = mongoose.model('CreditSchedule', creditScheduleSchema)

export default CreditSchedule
