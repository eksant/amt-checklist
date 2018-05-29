const mongoose  = require('mongoose')
const Schema    = mongoose.Schema

var mobiltangkisSchema = new Schema({
  nopol: {
    type: String,
  },
  KL: {
    type: Number
  },
  year: {
    type: Number
  },
  status: {
    type: Number
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('mobiltangki', mobiltangkisSchema)