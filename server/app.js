const express = require('express')
const router = require('./routers')
const errorHandler = require('./middleware/errorHandling')
const app = express()
const port = 3000


app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(router)
app.use(errorHandler)


app.listen(port, () => {
  console.log(`Open on port ${port}!`)
})

module.exports = app;