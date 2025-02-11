const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

const usersRouter = require('./controllers/user')

const { sendInvitationEmail } = require('./utils/emailService')
const eventRouter = require('./controllers/event')

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
})
const PORT = process.env.PORT
app.use(express.json())
app.use(cors())

app.use('/user', usersRouter)

// send a test email
app.get('/send-email', async (req, res) => {
  console.log('send-email')

  //return res.json({ message: 'send-email' })
  try {
    const to = 'redaeis@gmail.com'
    const subject = 'test Email'
    const htmlContent = `<h1>Hi ${to},</h1><p>You are invited to our event. Please RSVP!</p>`

    await sendInvitationEmail(to, subject, htmlContent)
    res.status(201).json({ message: 'invitation sent!' })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error on sending email', error: error.message })
  }
})
app.use('/event', eventRouter)

app.listen(PORT, () => {
  console.log('The express app is ready!', PORT ? PORT : 3000)
})
