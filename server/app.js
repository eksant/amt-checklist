require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const logger = require('morgan')
const redis = require('redis')
const chalk = require('chalk')
const compression = require('compression')
const errorHandler = require('errorhandler')
const lusca = require('lusca')
const clientRedis = redis.createClient()
const port = normalizePort(process.env.PORT || '3000')
const expressStatusMonitor = require('express-status-monitor')

//Create server
const app = express()
const server = app.listen(port, () => {
  console.log(
    '%s Server Rest API running at http://localhost:%d/api in %s mode',
    chalk.green('🚀'),
    app.get('port'),
    app.get('env')
  )
  console.log(
    '%s Server Graphql running at http://localhost:%d/graphql in %s mode',
    chalk.green('🚀'),
    app.get('port'),
    app.get('env')
  )
  // console.log('  Press CTRL-C to stop\n')
})
const io = require('socket.io')(server)

const cacheRedis = require('./middlewares/cache')
const configMongoDB = require('./config/mongodb')
const graphql = require('./config/graphql')

// Connecting MongoDB
configMongoDB.connectToServer(err => {
  if (err) return console.error(err)
})

// Connecting Socket IO
io.on('connection', socket => {
  console.log('Socket IO Connected...')
  socket.on('disconnect', function() {
    console.log('Socket IO Disconnected.')
  })
})

// Connecting Client Redis
clientRedis.on('ready', err => {
  err
    ? console.error('%s Redis client connection error : %d', chalk.red('🚀'), err)
    : console.log('%s Redis client connection success', chalk.green('🚀'))
})

// Connecting Graphql
graphql.connectToServer(app)

app.set('port', port)
app.set('socketio', io)

//Express configuration
app.use(cors())
app.use(logger('dev'))
app.use(helmet())
app.use(compression())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))
app.use(errorHandler())
app.use(expressStatusMonitor({ websocket: io, port: port }))

// Using Rest API
app.use('/api/', cacheRedis, require('./rest/routes/auth'))
app.use('/api/admins', cacheRedis, require('./rest/routes/admins'))
app.use('/api/users', cacheRedis, require('./rest/routes/users'))
app.use('/api/mobiltangkis', cacheRedis, require('./rest/routes/mobiltangkis'))
app.use('/api/checklist', cacheRedis, require('./rest/routes/checklist'))

// catch 404 and forward to error handler
// app.use((req, res, next) => {
//   var err = new Error('Not Found')
//   err.status = 404
//   next(err)
// })

// error handler
// app.use(function(err, req, res) {
//   res.locals.message = err.message
//   res.locals.error = req.app.get('env') === 'development' ? err : {}
//   res.status(err.status || 500).json({ err })
// })

function normalizePort(val) {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    return val // named pipe
  }

  if (port >= 0) {
    return port // port number
  }

  return false
}
