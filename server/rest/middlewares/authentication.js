const jsonwebtoken = require('jsonwebtoken')

module.exports = (req, res, next) => {
  if (!req.headers.token) {
    res.status(203).json({
      message: 'you dont have authentication !',
    })
  } else {
    var decode = jsonwebtoken.verify(req.headers.token, process.env.JWT_KEY)
    // console.log('decode: ', decode)
    if (decode.name !== 'JsonWebTokenError') {
      const { roles } = decode.user[0] || decode.user
      // console.log("roles", roles);
      if (roles === 'superadmin' || roles === 'admin') {
        req.decoded = decode.user[0]
        next()
      } else {
        next({
          message: 'you dont have authentication !',
        })
      }
    } else {
      next({
        message: 'you dont have authentication !',
      })
    }
  }
}
