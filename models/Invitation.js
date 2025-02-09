const mongoose = require('mongoose')

const invitationSchema = new mongoose.Schema(
  {
    guestName: {
      type: String,
      require: true,
      unique: true
    },
    email: {
      type: String,
      require: true
    },
    phone: {
      type: Number,
      require: true
    },
    invitationStatus: {
      type: String,
      require: true,
      enum: ['Sent', 'Failed', 'Pending'],
      default: 'Pending'
    },
    RSVPStatus: {
      type: String,
      require: true,
      enum: ['Yes', 'No', 'Maybe', 'Not Answered'],
      default: 'Not Answered'
    },
    responseDateTime: {
      type: Date
    },
    attendanceStatus: {
      type: String,
      require: true,
      enum: ['Attended', 'Not Attended'],
      default: 'Not Attended'
    },
    attendanceDateTime: {
      type: Date
    },
    attendanceBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
)

const Invitation = mongoose.model('Invitation', invitationSchema)

module.exports = Invitation
