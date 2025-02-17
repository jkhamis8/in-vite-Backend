const express = require('express')
const app = express()
const router = express.Router()
const User = require('../models/User.js')
const Event = require('../models/Event.js')
const Invitation = require('../models/Invitation.js')
const { sendInvitationEmail } = require('../utils/emailService.js')
const verifyToken = require('../middleware/verify-token.js')
app.use(verifyToken)

router.get('/getAllInvites/:eventID', async (req, res) => {
  try {
    const eventID = req.params.eventID
    const inviteObj = await Invitation.find({ eventID: { $in: eventID } })
    res.json({ inviteObj })
  } catch (error) {
    console.log(error)
  }
})
////////////////////////////
router.get('/getInvite/:inviteId', async (req, res) => {
  try {
    const inviteId = req.params.inviteId
    const inviteObj = await Invitation.findById(inviteId)
    res.json({ inviteObj })
  } catch (error) {
    console.log(error)
  }
})

router.post('/createInvite', async (req, res) => {
  try {
    const createInvite = await Invitation.create(req.body[0])
    try {
      const to = req.body.email
      const subject = 'Invitation Email'
      const htmlContent = `<h1>Hi ${req.body.guestName},</h1><p>You are invited to our event. Please RSVP!</p>`
      await sendInvitationEmail(to, subject, htmlContent)
      await Invitation.findByIdAndUpdate(createInvite._id, {
        invitationStatus: 1
      })
    } catch (error) {
      await Invitation.findByIdAndUpdate(createInvite._id, {
        invitationStatus: 2
      })
    }
    res.status(200).json({ done: 'done' })
  } catch (error) {
    console.log(error)
  }
})

router.put('/editInvite', async (req, res) => {
  try {
    const inviteID = req.body._id
    await Invitation.findByIdAndUpdate(inviteID, req.body)
    res.status(200).json({ done: 'done' })
  } catch (error) {
    console.log(error)
  }
})

router.delete('/deleteInvite/:inviteID', async (req, res) => {
  try {
    const inviteID = req.params.inviteID
    await Invitation.findByIdAndDelete(inviteID)
    res.status(200).json({ done: 'done' })
  } catch (error) {
    console.log(error)
  }
})

router.put('/rsvpResponse/:inviteID/:action', async (req, res) => {
  try {
    const inviteID = req.params.inviteID
    const action = req.params.action
    await Invitation.findByIdAndUpdate(inviteID, { RSVPStatus: action })

    res.status(200).json({ done: 'done' })
  } catch (error) {
    console.log(error)
  }
})

router.put('/attendanceStatus/:inviteID', async (req, res) => {
  try {
    const inviteID = req.params.inviteID
    await Invitation.findByIdAndUpdate(inviteID, { attendanceStatus: 1 })
    res.status(200).json({ done: 'done' })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
