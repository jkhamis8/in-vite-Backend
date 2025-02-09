// /controllers/users.js
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/User.js')
const jwt = require('jsonwebtoken')

const SALT_LENGTH = 12

router.get('/', (req, res) => {
  return '<h1>Hello</h1>'
})

router.post('/signup', async (req, res) => {
  try {
    // Check if the username is already taken
    const userInDatabase = await User.findOne({ username: req.body.username })
    if (userInDatabase) {
      return res.json({ error: 'Username already taken.' })
    }
    // Create a new user with hashed password
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, SALT_LENGTH)
    })
    const token = jwt.sign(
      { username: user.username, _id: user._id, email: user.email },
      process.env.JWT_SECRET
    )

    res.status(201).json({ user, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.post('/signin', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign(
        { username: user.username, _id: user._id, email: user.email },
        process.env.JWT_SECRET
      )

      res.status(200).json({ token, user })
    } else {
      res.status(401).json({ error: 'Invalid username or password.' })
    }
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.post('/editUserProfile', async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, SALT_LENGTH)
      await User.findByIdAndUpdate(req.body._id, {
        email: req.body.email,
        password: req.body.password
      })
    } else {
      await User.findByIdAndUpdate(req.body._id, { email: req.body.email })
    }
    res.status(200).json({ done: 'done' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.get('send-email', async (req, res) => {
  console.log('send-email')

  return res.json({ message: 'send-email' })
  // try {
  //   const to = 'redaeis@gmail.com'
  //   const subject = 'test Email'
  //   const htmlContent = `<h1>Hi ${to},</h1><p>You are invited to our event. Please RSVP!</p>`

  //   await sendInvitationEmail(to, subject, htmlContent)
  //   res.status(201).json({ message: 'invitation sent!' })
  // } catch (error) {
  //   res
  //     .status(500)
  //     .json({ message: 'Error on sending email', error: error.message })
  // }
})

module.exports = router
