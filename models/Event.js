const mongoose = require('mongoose')
const User = require('./User')
const Venue = require('./Venue')

const eventSchema = new mongoose.Schema(
  {
    eventManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
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
    date: {
      type: Date,
      require: true
    },
    venue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Venue'
    },
    addressLine: {
      type: String
    },
    locationURL: {
      type: String
    },
    description: {
      type: String
    },
    eventName: {
      type: String,
      require: true
    },
    representatives: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    AttendanceScanners: [
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
