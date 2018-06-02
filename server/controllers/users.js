const jwt     = require("jsonwebtoken")
const bcrypt  = require("bcryptjs")
const user    = require('../models/users')

module.exports = {
  auth: (req, res, next) => {
    user.findOne({
      email: req.body.email.trim()
    })
    .then(users => {
      if (users) {
        if (bcrypt.compareSync(req.body.password, users.password)) {
          var token = jwt.sign({ users }, process.env.JWT_KEY);
          res.json({
            message: 'Login succeess',
            users,
            token
          });
        }
      }
      res.json({
        message: 'Fail Login'
      });
    })
    .catch(err => next(err));
  },

  create: (req, res, next) => {
    user.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
      mobile: req.body.mobile,
      roles: req.body.roles,
      status: 1,
      imgUrl: req.body.imgUrl || null
    })
    .then(users => res.json(users))
    .catch(err => next(err))
  },

  read: (req, res, next) => {
    user.find()
    .then(users => res.json(users))
    .catch(err => next(err))
  },

  readById: (req, res, next) => {
    user.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => next(err))
  },

  update: (req, res, next) => {
    user.findByIdAndUpdate(req.params.id, {
      username: req.body.username,
      email: req.body.email.trim(),
      mobile: req.body.mobile,
      roles: req.body.roles,
      status: req.body.status,
    })
    .then(user => res.json(user))
    .catch(err => next(err))
  },

  destroy: (req, res, next) => {
    user.findByIdAndRemove(req.params.id)
    .then(user => res.json(user))
    .catch(err => next(err))
  }
}