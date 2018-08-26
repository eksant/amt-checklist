require('dotenv').config()

const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const helmet = require('helmet')
const logger = require('morgan')
const redis = require('redis')
// const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
// const { makeExecutableSchema } = require("graphql-tools");
// const { ApolloServer, gql } = require("apollo-server");

const cacheRedis = require('./rest/middlewares/cache')
// const typeDefs = require('./graphql/sc')
// const typeDefs = fs.readFileSync("./graphql/schema.graphql", "utf-8");
// const resolverUser = require("./graphql/resolverUser");
// const schema = makeExecutableSchema({
//   typeDefs
//   // resolverUser
// });

const app = express()
const clientRedis = redis.createClient()

mongoose.Promise = global.Promise
mongoose.connection.openUri('mongodb://localhost:27017/mtc', {
  autoIndex: false,
  useNewUrlParser: true,
})
mongoose.connection
  .once('open', () => {
    console.log('🚀 MongoDB connection success')
  })
  .on('error', error => {
    console.error('🚀 MongoDB connection error', error)
  })

clientRedis.on('ready', err => {
  err
    ? console.error('🚀 Redis client connection error : ', err)
    : console.log('🚀 Redis client connection success')
})

app.use(cors())
app.use(logger('dev'))
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Using GRAPHQL
// app.use("/graphql", graphqlExpress({ schema }));
// app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

// Using REST API
app.use('/api/', cacheRedis, require('./rest/routes/auth'))
app.use('/api/users', cacheRedis, require('./rest/routes/users'))
app.use('/api/mobiltangkis', cacheRedis, require('./rest/routes/mobiltangkis'))
app.use('/api/checklist', cacheRedis, require('./rest/routes/checklist'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500).json({ err })
})

module.exports = app
