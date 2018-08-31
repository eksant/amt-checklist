const _ = require('lodash')
const jwt = require('jsonwebtoken')

const { User } = require('../models/users')

const checkUser = context => {
  if (!context.user) {
    return Promise.reject('You dont have authentication!')
  }
  return Promise.resolve(context.user)
}

const createToken = user => {
  return jwt.sign(_.omit(user.toObject(), 'password'), process.env.JWT_KEY, {
    expiresIn: '10s',
  })
}

const createRefreshToken = user => {
  const refreshToken = jwt.sign({ type: 'refresh' }, process.env.JWT_KEY, {
    expiresIn: '20s',
  })

  return User.findOneAndUpdate({ username: user.username }, { refreshToken })
    .then(() => {
      return refreshToken
    })
    .catch(err => {
      throw err
    })
}

const validateToken = (req, res, next) => {
  if (!req.headers.token) {
    res.status(203).json({
      message: 'You dont have authentication!',
    })
  } else {
    var decode = jwt.verify(req.headers.token, process.env.JWT_KEY)
    // console.log('decode: ', decode)
    if (decode.name !== 'JsonWebTokenError') {
      next()
    } else {
      next({
        message: 'You dont have authentication!',
      })
    }
  }
}

const validateRefreshToken = refreshToken => {
  if (refreshToken != '') {
    return new Promise((res, rej) => {
      jwt.verify(refreshToken, process.env.JWT_KEY, err => {
        if (err) {
          rej({
            code: 'refreshExpired',
            message: 'Refresh token expired - session ended!',
          })
        } else {
          User.findOne({ refreshToken: refreshToken })
            .then(user => {
              res(user)
            })
            .catch(err => {
              rej(err)
            })
        }
      })
    })
  } else {
    throw 'There is no refresh token to check!'
  }
}

module.exports = {
  checkUser,
  createToken,
  createRefreshToken,
  validateToken,
  validateRefreshToken,
}
