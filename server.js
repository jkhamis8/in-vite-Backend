const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

const usersRouter = require('./controllers/user')
const eventRouter = require('./controllers/event')
const invitationRouter = require('./controllers/invitation')
const venueRouter = require('./controllers/venue')

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
})
const PORT = process.env.PORT
app.use(express.json())
app.use(cors())

app.use('/user', usersRouter)
app.use('/event', eventRouter)
app.use('/venue', venueRouter)
app.use('/invitation', invitationRouter)

app.listen(PORT, () => {
  console.log('The express app is ready!', PORT ? PORT : 3000)
})
