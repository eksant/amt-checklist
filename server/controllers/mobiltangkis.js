const bcrypt      = require("bcryptjs")
const mobiltangki = require('../models/mobiltangkis')

module.exports = {
  create: (req, res, next) => {
    mobiltangki.create({
      nopol: req.body.nopol,
      KL: req.body.KL,
      year: req.body.year,
      status: req.body.status,
    })
    .then(mobiltangkis => res.json(mobiltangkis))
    .catch(err => next(err))
  },

  read: (req, res, next) => {
    mobiltangki.find()
    .then(mobiltangkis => res.json(mobiltangkis))
    .catch(err => next(err))
  },

  readById: (req, res, next) => {
    mobiltangki.findById(req.params.id)
    .then(mobiltangki => res.json(mobiltangki))
    .catch(err => next(err))
  },

  update: (req, res, next) => {
    mobiltangki.findByIdAndUpdate(req.params.id, {
      nopol: req.body.nopol,
      KL: req.body.KL,
      year: req.body.year,
      status: req.body.status,
    })
    .then(mobiltangki => res.json(mobiltangki))
    .catch(err => next(err))
  },

  destroy: (req, res, next) => {
    mobiltangki.findByIdAndRemove(req.params.id)
    .then(mobiltangki => res.json(mobiltangki))
    .catch(err => next(err))
  }
}