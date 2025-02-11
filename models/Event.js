const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      require: true
    },
    description: {
      type: String
    },
    addressLine: {
      type: String
    },
    locationURL: {
      type: String
    },
    date: {
      type: Date,
      require: true
    },
    timeHour: {
      type: Number,
      require: true,
      min: 0,
      max: 23
    },
    timeMinutes: {
      type: Number,
      require: true,
      min: 0,
      max: 59
    },
    venue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Venue'
    },
    eventManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    representatives: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  { timestamps: true }
)

const Event = mongoose.model('Event', eventSchema)

module.exports = Event
