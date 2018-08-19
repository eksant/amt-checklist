require('dotenv').config()
const express       = require('express')
const bodyParser    = require('body-parser')
const cors          = require('cors')
const mongoose      = require('mongoose')
const helmet        = require('helmet')
const routes        = require('./routes/')

const app     = express()
const router  = express.Router()

mongoose.connection.openUri('mongodb://localhost:27017/mtc')
mongoose.Promise = global.Promise
mongoose.connection.once('open', () => {
  console.log('database connection success')
}).on('error', (error) => {
  console.error('database connection error', error)
})

routes(router)

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(helmet())

app.use('/api', router)

module.exports = app
