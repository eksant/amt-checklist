const { ApolloServer } = require('apollo-server-express')

const { getToken } = require('../middlewares/auth')
const typeDefs = require('../graphql/schema/schemagraphql.js')
const resolvers = require('../graphql/resolvers')

const connectToServer = app => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // tracing: true,
    // cacheControl: true,
    context: async ({ req }) => {
      const authUser = await getToken(req)

      return {
        authUser,
      }
    },
  })
  server.applyMiddleware({ app, path: '/graphql' })
  // server.installSubscriptionHandlers(app)
}

module.exports = { connectToServer }
