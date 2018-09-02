const _ = require('lodash')
const jwt = require('jsonwebtoken')
const { AuthenticationError } = require('apollo-server')
const { ForbiddenError } = require('apollo-server')
const { combineResolvers, skip } = require('graphql-resolvers')

// Using for Global Authentication
const createToken = user => {
  return jwt.sign(_.omit(user.toObject(), 'password'), process.env.JWT_KEY, {
    expiresIn: '8h',
  })
}

// Using for Rest API Authentication
const validateToken = async (req, res, next) => {
  const token = req.headers.token

  if (token) {
    try {
      const decode = await jwt.verify(token, process.env.JWT_KEY)
      req.authUser = decode.user
      next()
    } catch (error) {
      res.status(203).json({
        message: 'Your session expired. Sign in again!',
        error,
      })
    }
  } else {
    res.status(203).json({
      message: 'You dont have authentication!',
    })
  }
}

// Using for Graphql Authentication
const verifyToken = async req => {
  const token = req.headers.token

  if (token) {
    try {
      return await jwt.verify(token, process.env.JWT_KEY)
    } catch (error) {
      throw new AuthenticationError('Your session expired. Sign in again!')
    }
  } else {
    throw new AuthenticationError('You dont have authentication!')
  }
}

const isAuthenticated = (parent, args, { authUser }) =>
  authUser ? skip : new ForbiddenError('You dont have authentication!')

const isSuperAdmin = combineResolvers(
  isAuthenticated,
  (parent, args, { authUser: { roles } }) =>
    roles === 'Superadmin' ? skip : new ForbiddenError('You dont have authorized as superadmin!')
)

const isAdmin = combineResolvers(
  isAuthenticated,
  (parent, args, { authUser: { roles } }) =>
    roles === 'Admin' ? skip : new ForbiddenError('You dont have authorized as admin!')
)

module.exports = {
  createToken,
  validateToken,
  verifyToken,
  isAuthenticated,
  isSuperAdmin,
  isAdmin,
}
