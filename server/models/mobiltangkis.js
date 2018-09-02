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
    createdBy: {
      type: Schema.Types.Object,
      ref: 'User',
      required: [true, 'CreateBy required!'],
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

const create = async data => {
  return await MobilTangki.create(data)
}

const read = async () => {
  return await MobilTangki.find()
}

const readId = async id => {
  return await MobilTangki.findOne({ _id: ObjectId(id) })
}

const update = async (id, data) => {
  return await MobilTangki.findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: data },
    { upsert: true, new: true }
  )
}

const destroy = async id => {
  return await MobilTangki.deleteOne({ _id: ObjectId(id) })
}

module.exports = { MobilTangki, create, read, readId, update, destroy }
