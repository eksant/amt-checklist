const mongoose  = require('mongoose')
const Schema    = mongoose.Schema

var usersSchema = new Schema({
  username: {
    type: String,
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  mobile: {
    type: String
  },
  roles: {
    type: Number
  },
  status: {
    type: Number
  },
  imgUrl: {
    type: String
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('user', usersSchema)