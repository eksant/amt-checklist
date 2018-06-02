const jsonwebtoken = require('jsonwebtoken')

module.exports = (req,res,next) => {
  if (!req.headers.token) {
    next({
      message: 'you dont have authentication !'
    })
  }
  var decode = jsonwebtoken.verify(req.headers.token, process.env.JWT_KEY)
  if (decode.name !== 'JsonWebTokenError'){
    req.decoded = decode.admins
    next()
  } else {
    next({
      message: 'you dont have authentication !'
    })
  }
}