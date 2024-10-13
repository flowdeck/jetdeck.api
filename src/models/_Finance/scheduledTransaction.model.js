import mongoose from 'mongoose'

const scheduledTransactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['credit', 'debit'],
    required: true,
  },
  source: {
    // Use for both income and expense sources
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  frequencyType: {
    // More general frequency type
    type: String,
    enum: ['weekly', 'bi-weekly', 'monthly', 'day-of-month', 'last-day-of-month', 'every-3-months'],
    required: false,
  },
  dayOfMonth: {
    // Only applicable for 'day-of-month' frequency
    type: Number,
    min: 1,
    max: 31,
    required: function () {
      return this.frequencyType === 'day-of-month'
    },
  },
  startDate: {
    type: Date,
    default: () => {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return today
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
})

const ScheduledTransaction = mongoose.model('ScheduledTransaction', scheduledTransactionSchema)

export default ScheduledTransaction
