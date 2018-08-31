const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const uniqueValidator = require('mongoose-unique-validator')
const ObjectId = mongoose.Types.ObjectId
const Schema = mongoose.Schema

var schema = new Schema(
  {
    nopol: {
      type: String,
      trim: true,
      unique: true,
      required: [true, 'No Polisi required!'],
    },
    KL: {
      type: Number,
      trim: true,
      required: [true, 'KL required!'],
    },
    year: {
      type: Number,
      trim: true,
    },
    status: {
      type: String,
      enum: ['Active', 'NonActive'],
      required: [true, 'Status required!'],
    },
  },
  {
    timestamps: true,
  }
)

schema.plugin(mongoosePaginate)
schema.plugin(uniqueValidator, {
  message: '{VALUE} already registered',
})
const MobilTangki = mongoose.model('MobilTangki', schema)

const create = (data, callback) => {
  MobilTangki.create(data, (error, data) => {
    if (!error) callback(null, data)
    else {
      callback(error, null)
    }
  })
}

const read = callback => {
  MobilTangki.find((error, mobiltangkis) => {
    if (!error) {
      callback(null, mobiltangkis)
    } else {
      callback(error, null)
    }
  })
}

const readId = (id, callback) => {
  MobilTangki.find({ _id: ObjectId(id) }, (error, mobiltangki) => {
    if (!error) {
      callback(null, mobiltangki)
    } else {
      callback(error, null)
    }
  })
}

const update = (id, data, callback) => {
  MobilTangki.findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: data },
    { upsert: true, new: true },
    (error, data) => {
      if (!error) {
        callback(null, data)
      } else {
        callback(error, null)
      }
    }
  )
}

const destroy = (id, callback) => {
  MobilTangki.remove({ _id: ObjectId(id) }, error => {
    if (!error) {
      callback(null)
    } else {
      callback(error)
    }
  })
}

module.exports = { MobilTangki, create, read, readId, update, destroy }
