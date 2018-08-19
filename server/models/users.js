const mongoose          = require('mongoose')
const mongoosePaginate  = require('mongoose-paginate')
const Schema            = mongoose.Schema

var schema = new Schema({
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

schema.plugin(mongoosePaginate)
module.exports = mongoose.model('user', schema)