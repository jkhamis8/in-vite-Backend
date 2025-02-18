const express = require('express')
const app = express()
const router = express.Router()
const User = require('../models/User.js')
const Event = require('../models/Event.js')
const verifyToken = require('../middleware/verify-token.js')
app.use(verifyToken)

router.get('/getAllEvents/:userID', async (req, res) => {
  try {
    const userID = req.params.userID
    const eventObj = await Event.find({
      eventManager: { $in: userID }
    })
      .populate('eventManager')
      .populate('representatives')
      .populate('venue')
    res.json({ eventObj })
  } catch (error) {
    console.log(error)
  }
})

router.get('/getEvent/:eventID', async (req, res) => {
  try {
    const eventID = req.params.eventID
    const eventObj = await Event.findById(eventID)
      .populate('eventManager')
      .populate('representatives')
      .populate('venue')
    res.json({ eventObj })
  } catch (error) {
    console.log(error)
  }
})

router.post('/createEvent', async (req, res) => {
  try {
    if (req.body[0].venue == '') {
      req.body[0].venue = null
    }
    const createdEvent = await Event.create(req.body[0])
    await Event.findByIdAndUpdate(createdEvent, { eventManager: req.body[1] })
    res.status(200).json({ done: 'done' })
  } catch (error) {
    console.log(error)
  }
})

router.get('/editEvent/:eventID', async (req, res) => {
  try {
    const eventID = req.params.eventID
    const eventObj = await Event.findById(eventID)
    res.json({ eventObj });
  } catch (error) {
    console.log(error);
  }
})

router.put('/editEvent', async (req, res) => {
  try {
    const eventID = req.body._id
    await Event.findByIdAndUpdate(eventID, req.body)
    res.status(200).json({ done: 'done' })
  } catch (error) {
    console.log(error)
  }
})

router.delete('/deleteEvent/:eventId', async (req, res) => {
  try {
    const eventId = req.params.eventId
    await Event.findByIdAndDelete(eventId)
    res.status(200).json({ done: 'done' })
  } catch (error) {
    console.log(error)
  }
})

router.put('/addUserInEvent', async (req, res) => {
  try {
    const eventID = req.body.eventID
    const userID = req.body.userID
    await Event.findByIdAndUpdate(eventID, {
      $push: { representatives: userID }
    })
    res.status(200).json({ done: 'done' })
  } catch (error) {
    console.log(error)
  }
})

router.put('/removeUserFromEvent/', async (req, res) => {
  try {
    const eventID = req.body.eventID
    const userID = req.body.userID
    await Event.findByIdAndUpdate(eventID, {
      $pull: { representatives: userID }
    })
    res.status(200).json({ done: 'done' })
  } catch (error) {
    console.log(error)
  }
})

router.put('/addVenueInEvent', async (req, res) => {
  try {
    const eventID = req.body.eventID
    const venueID = req.body.venueID
    await Event.findByIdAndUpdate(eventID, { $push: { Venue: venueID } })
    res.status(200).json({ done: 'done' })
  } catch (error) {
    console.log(error)
  }
})

router.put('/removeVenueFromEvent/', async (req, res) => {
  try {
    const eventID = req.body.eventID
    const venueID = req.body.venueID
    await Event.findByIdAndUpdate(eventID, { $pull: { Venue: venueID } })
    res.status(200).json({ done: 'done' })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
