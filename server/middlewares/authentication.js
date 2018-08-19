const jsonwebtoken = require('jsonwebtoken')

module.exports = (req,res,next) => {
  if (!req.headers.token) {
    res.status(202).json({
      message: 'you dont have authentication !'
    })
  } else {
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
}