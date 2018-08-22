const jsonwebtoken = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (!req.headers.token) {
    next({
      message: "you dont have authorization !"
    });
  }
  var decode = jsonwebtoken.verify(req.headers.token, process.env.JWT_KEY);
  // console.log("decode: ", decode);
  if (decode.name !== "JsonWebTokenError") {
    const { roles } = decode.user[0];
    // console.log("roles", roles);
    if (roles === "superadmin" || roles === "admin" || roles === "sopir" || roles === "kernet") {
      req.decoded = decode.user[0];
      // console.log('decode.user[0]: ', decode.user[0])
      next();
    } else {
      next({
        message: "you dont have authorization !"
      });
    }
  } else {
    next({
      message: "you dont have authorization !"
    });
  }
};
