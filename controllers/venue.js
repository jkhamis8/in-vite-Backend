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

router.get('/getVenues/:venueID', async (req, res) => {
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
module.exports = router;
