const express = require('express');
const app = express();
const router = express.Router()
const User = require('../models/User.js');
const Event = require('../models/Event.js');
const Invitation = require('../models/Invitation.js')
const verifyToken = require('../middleware/verify-token.js');
app.use(verifyToken);

router.get('/getAllInvites/:eventID', async (req, res) => {
  try {
    const eventID = req.params.eventID
    const inviteObj = await Invitation.find({ "eventID": { $in: eventID } })
    res.json({ inviteObj });
  } catch (error) {
    console.log(error);
  }
})
////////////////////////////
router.get("/getInvite/:inviteId", async (req, res) => {
  try {
    const inviteId = req.params.inviteId
    const inviteObj = await Invitation.findById(inviteId)
    res.json({ inviteObj });
  } catch (error) {
    console.log(error);
  }
})

router.post("/createInvite", async (req, res) => {
  try {
    const createInvite = await Invitation.create(req.body[0])
    res.status(200).json({ 'done': 'done' });
  } catch (error) {
    console.log(error)
  }
})

router.put("/editInvite", async (req, res) => {
  try {
    const entryId = req.body._id
    await Invitation.findByIdAndUpdate(entryId, req.body)
    res.status(200).json({ 'done': 'done' });
  } catch (error) {
    console.log(error)
  }
})

router.delete("/deleteInvite/:inviteID", async (req, res) => {
  try {
    const inviteID = req.params.inviteID
    await Invitation.findByIdAndDelete(inviteID)
    res.status(200).json({ 'done': 'done' });
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
