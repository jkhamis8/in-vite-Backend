const express = require('express');
const app = express();
const router = express.Router();
const Venue = require('../models/Venue.js');
const verifyToken = require('../middleware/verify-token.js');
app.use(verifyToken);

router.get('/getAllVenues/', async (req, res) => {
  try {
    const venueObj = await Venue.find()
    res.json({ venueObj });
  } catch (error) {
    console.log(error);
  }
})

router.get('/getVenue/:venueID', async (req, res) => {
  try {
    const venueID = req.params.venueID
    const venueObj = await Venue.findById(venueID)
    res.json({ venueObj });
  } catch (error) {
    console.log(error);
  }
})

router.post('/createVenue', async (req, res) => {
  try {
    await Venue.create(req.body)
    res.status(200).json({ 'done': 'done' });
  }
  catch (error) {
    console.log(error);
  }
})

router.put('/editVenue', async (req, res) => {
  try {
    console.log(req.body);

    const venueID = req.body._id
    await Venue.findByIdAndUpdate(venueID, req.body)
    res.status(200).json({ 'done': 'done' });
  } catch (error) {
    console.log(error);
  }
});

router.delete('/deleteVenue/:venueID', async (req, res) => {
  try {
    const venueID = req.params.venueID
    await Venue.findByIdAndDelete(venueID)
    res.status(200).json({ 'done': 'done' });
  } catch (error) {
    console.log(error);
  }
})

router.put('/addVenueInEvent', async (req, res) => {
  try {
    const eventID = req.body.eventID
    const venueID = req.body.venueID
    await Event.findByIdAndUpdate(eventID, { $push: { Venue: venueID } })
    res.status(200).json({ 'done': 'done' });
  } catch (error) {
    console.log(error);
  }
});

router.put('/removeVenueFromEvent/', async (req, res) => {
  try {
    const eventID = req.body.eventID
    const venueID = req.body.venueID
    await Event.findByIdAndUpdate(eventID, { $pull: { Venue: venueID } })
    res.status(200).json({ 'done': 'done' });
  } catch (error) {
    console.log(error);
  }
})

module.exports = router;
