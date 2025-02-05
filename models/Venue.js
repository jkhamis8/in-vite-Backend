const mongoose = require('mongoose')

const venueSchema = new mongoose.Schema(
  {
    venueName: {
      type: String,
      require: true
    },
    addressLine: {
      type: String,
      require: true
    },
    locationURL: {
      type: String,
      require: true
    },
    capacity: {
      type: Number,
      require: true
    },
    contactInfo: {
      type: Number,
      require: true
    }
  },
  { timestamps: true }
)

const Venue = mongoose.model('Venue', venueSchema)

module.exports = Venue
