const express = require('express')
const router = require('./routers')
const cors = require('cors')
const errorHandler = require('./middleware/errorHandling')
const GitHubStrategy = require('passport-github').Strategy;
const app = express()
const port = 3000
require('dotenv').config()

// Konfigurasi Passport GitHub Strategy

// app.use(passport.initialize());
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(router)
app.use(errorHandler)


app.listen(port, () => {
  console.log(`Open on port ${port}!`)
})

module.exports = app;