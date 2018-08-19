const jwt     = require("jsonwebtoken")
const bcrypt  = require("bcryptjs")
const user    = require('../models/users')

module.exports = {
  auth: (req, res, next) => {
    user.findOne({
      email: req.body.email.trim()
    })
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          var token = jwt.sign({ user }, process.env.JWT_KEY);
          res.status(200).json({
            message: 'Login succeess',
            user: {
              username: user.username,
              email: user.email,
              imgUrl: user.imgUrl
            },
            token
          });
        } else {
          res.status(201).json({
            message: 'Invalid email or password !!'
          })
        }
      } else {
        res.status(201).json({
          message: 'Invalid email or password !!'
        })
      }
    })
    .catch(err => next(err));
  },

  create: (req, res, next) => {
    user.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
      mobile: req.body.mobile || null,
      roles: req.body.roles,
      status: 1,
      imgUrl: req.body.imgUrl || null
    })
    .then(users => res.status(200).json(users))
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
    .then(user => res.status(200).json(user))
    .catch(err => next(err))
  }
}