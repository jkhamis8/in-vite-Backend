const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true
    },
    password: {
      type: String,
      require: true
    },
    fullName: {
      type: String,
      require: true
    },
    email: {
      type: String,
      require: true
    },
    role: {
      type: String,
      require: true,
      enum: [
        'Administrator',
        'EventManager',
        'Representative',
        'AttendanceScanner'
      ],
      default: 'EventManager'
    },
    eventManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

module.exports = User
