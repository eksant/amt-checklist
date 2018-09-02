const fs = require('fs')
const path = require('path')
const { makeExecutableSchema } = require('graphql-tools')

const typeDefs = fs.readFileSync(path.resolve(__dirname, './schemagraphql.graphql'), 'utf-8')
const resolvers = require('../resolvers')

module.exports = makeExecutableSchema({ typeDefs, resolvers })
