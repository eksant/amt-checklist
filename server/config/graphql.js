const { ApolloServer } = require('apollo-server-express')

const { verifyToken } = require('../middlewares/auth')
const typeDefs = require('../graphql/schema/schemagraphql')
const resolvers = require('../graphql/resolvers')

const connectToServer = app => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const authUser = await verifyToken(req)

      return {
        authUser,
      }
    },
  })
  server.applyMiddleware({ app, path: '/graphql' })
}

module.exports = { connectToServer }
