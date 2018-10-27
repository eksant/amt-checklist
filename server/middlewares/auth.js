const _ = require('lodash')
const jwt = require('jsonwebtoken')
const { AuthenticationError, ForbiddenError } = require('apollo-server')
const { combineResolvers, skip } = require('graphql-resolvers')

// Using for Global Authentication
const createToken = user => {
  const tokenUser = _.omit(user.toObject(), [
    'password',
    'createdBy',
    'createdAt',
    'updatedAt',
    '_v',
  ])
  // console.log('token user', tokenUser)

  return jwt.sign(tokenUser, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRED || '9h',
  })
}

// Using for Rest API Authentication
const validateTokenSuperadmin = async (req, res, next) => {
  const token = req.headers.token

  if (token) {
    try {
      const decode = await jwt.verify(token, process.env.JWT_KEY)
      if (decode.roles === 'Superadmin') {
        req.authUser = decode
        next()
      } else {
        res.status(203).json({
          status: 203,
          message: 'You dont have authentication!',
        })
        next('You dont have authentication!')
      }
    } catch (error) {
      res.status(203).json({
        status: 203,
        message: 'Your session expired. Sign in again!',
        error,
      })
      next(error)
    }
  } else {
    res.status(203).json({
      status: 203,
      message: 'You dont have authentication!',
    })
    next('You dont have authentication!')
  }
}

const validateTokenAdmin = async (req, res, next) => {
  const token = req.headers.token

  if (token) {
    try {
      const decode = await jwt.verify(token, process.env.JWT_KEY)
      if (decode.roles === 'Superadmin' || decode.roles === 'Admin') {
        req.authUser = decode
        next()
      } else {
        res.status(203).json({
          status: 203,
          message: 'You dont have authentication!',
        })
        next('You dont have authentication!')
      }
    } catch (error) {
      res.status(203).json({
        status: 203,
        message: 'Your session expired. Sign in again!',
        error,
      })
      next(error)
    }
  } else {
    res.status(203).json({
      status: 203,
      message: 'You dont have authentication!',
    })
    next('You dont have authentication!')
  }
}

const validateTokenUser = async (req, res, next) => {
  const token = req.headers.token

  if (token) {
    try {
      const decode = await jwt.verify(token, process.env.JWT_KEY)
      if (
        decode.roles === 'Superadmin' ||
        decode.roles === 'Admin' ||
        decode.roles === 'Sopir' ||
        decode.roles === 'Kernet'
      ) {
        req.authUser = decode
        next()
      } else {
        res.status(203).json({
          status: 203,
          message: 'You dont have authentication!',
        })
        next('You dont have authentication!')
      }
    } catch (error) {
      res.status(203).json({
        status: 203,
        message: 'Your session expired. Sign in again!',
        error,
      })
      next(error)
    }
  } else {
    res.status(203).json({
      status: 203,
      message: 'You dont have authentication!',
    })
    next('You dont have authentication!')
  }
}

// Using for Graphql Authentication
const getToken = async req => {
  const token = req.headers.token

  if (token) {
    try {
      return await jwt.verify(token, process.env.JWT_KEY)
    } catch (error) {
      throw new AuthenticationError('Your session expired. Sign in again!')
    }
  }
}

const isAuthenticated = (parent, args, { authUser }) =>
  authUser ? skip : new ForbiddenError('You dont have authentication!')

const gqlValidateTokenSuperadmin = combineResolvers(
  isAuthenticated,
  (parent, args, { authUser: { roles } }) =>
    roles === 'Superadmin' ? skip : new ForbiddenError('You dont have authentication!')
)

const gqlValidateTokenAdmin = combineResolvers(
  isAuthenticated,
  (parent, args, { authUser: { roles } }) =>
    roles === 'Superadmin' || roles === 'Admin'
      ? skip
      : new ForbiddenError('You dont have authentication!')
)

const gqlValidateTokenUser = combineResolvers(
  isAuthenticated,
  (parent, args, { authUser: { roles } }) =>
    roles === 'Superadmin' || roles === 'Admin' || roles === 'Sopir' || roles === 'Kernet'
      ? skip
      : new ForbiddenError('You dont have authentication!')
)

module.exports = {
  createToken,
  validateTokenSuperadmin,
  validateTokenAdmin,
  validateTokenUser,
  getToken,
  gqlValidateTokenSuperadmin,
  gqlValidateTokenAdmin,
  gqlValidateTokenUser,
}
