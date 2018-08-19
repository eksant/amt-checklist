const mongoose          = require('mongoose')
const mongoosePaginate  = require('mongoose-paginate')
const Schema            = mongoose.Schema

var schema = new Schema({
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

schema.plugin(mongoosePaginate)
module.exports = mongoose.model('mobiltangki', schema)