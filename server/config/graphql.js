const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const bodyParser = require('body-parser')
const ejwt = require('express-jwt')

const schema = require('../graphql/schema')

const connectToServer = app => {
  app.use(
    '/graphql',
    bodyParser.json(),
    ejwt({
      secret: process.env.JWT_KEY,
      credentialsRequired: false,
    }),
    graphqlExpress(req => ({
      schema,
      context: { user: req.user },
    })),
    (req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, Content-Length, X-Requested-With'
      )
      if (req.method === 'OPTIONS') {
        res.sendStatus(200)
      } else {
        next()
      }
    }
  )

  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
}

module.exports = { connectToServer }
