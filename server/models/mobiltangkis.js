const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const uniqueValidator = require('mongoose-unique-validator')
const uuidv1 = require('uuid/v1')
// const ObjectId = mongoose.Types.ObjectId
const Schema = mongoose.Schema

var schema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv1(),
    },
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
  return await MobilTangki.create({
    ...data,
    _id: uuidv1(),
  })
}

const read = async () => {
  return await MobilTangki.find()
}

const readId = async id => {
  return await MobilTangki.findOne({
    // _id: ObjectId(id)
    _id: id,
  })
}

const update = async (id, data) => {
  return await MobilTangki.findOneAndUpdate(
    // { _id: ObjectId(id) },
    { _id: id },
    { $set: data },
    { upsert: true, new: true }
  )
}

const destroy = id => {
  // return await MobilTangki.deleteOne({ _id: ObjectId(id) })
  MobilTangki.findOneAndDelete({ _id: id }, async err => {
    if (err) return await false
    return await true
  })
}

module.exports = { MobilTangki, create, read, readId, update, destroy }
