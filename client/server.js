const logger = require('./logger')
const express = require('express')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

const port = process.env.PORT || 5000
const endpoint = process.env.ENDPOINT || ""

start()

async function start() {
  app.use(cors())
  app.use(bodyParser.json())
  app.use(express.static(path.resolve(__dirname, 'build')))

  app.get("/health", (req, res) => {
    res.send("OK")
  })

  app.get("/configuration", (req, res) => {
    res.redirect("/admin")
  })

  app.get("/channels", (req, res) => {
    res.redirect("/admin")
  })


  app.listen(port, () =>
    logger.log(`Listening on port ${port}`)
  )
}