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
    const guestInDatabase = await Invitation.findOne({ email: req.body.email, eventID: req.body.eventID })
    if (guestInDatabase) {
      return res.status(401).json({ error: 'Guest already Invited.' })
    }

    const createInvite = await Invitation.create(req.body)
    try {
      const eventObj = await Event.findById(req.body.eventID).populate('eventManager').populate('representatives').populate('venue')
      const to = req.body.email
      const subject = 'Invitation Email'
      const htmlContent = `
        <h1>Hi ${req.body.guestName},</h1>
        <p>${eventObj.description}</p>
        <p><strong>Date:</strong> ${eventObj.date}</p>
        <p><strong>Location:</strong> ${eventObj.addressLine}</p>
        <p>Please let us know if you can make it by clicking the RSVP button below:</p>
        <p>
          <a href="${process.env.URL}/RSVP/${createInvite._id}/1" style="display:inline-block;padding:10px 20px;font-size:16px;color:#fff;background-color:#4CAF50;text-decoration:none;border-radius:5px;">Accept</a>
        </p>
              <p>
          <a href="${process.env.URL}/RSVP/${createInvite._id}/0" style="display:inline-block;padding:10px 20px;font-size:16px;color:#fff;background-color:#cb1a55;text-decoration:none;border-radius:5px;">Reject</a>
        </p>
        <p>We look forward to seeing you there!</p>
        <p>Best regards,<br/>${eventObj.fullName}</p>
        `

      await sendInvitationEmail(to, subject, htmlContent)
      await Invitation.findByIdAndUpdate(createInvite._id, { invitationStatus: 'Sent' })
    } catch (error) {
      await Invitation.findByIdAndUpdate(createInvite._id, { invitationStatus: 'Failed' })
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

router.get('/rsvpResponse/:inviteID/:action', async (req, res) => {
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
