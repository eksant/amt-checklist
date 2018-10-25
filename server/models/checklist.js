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
    createdBy: {
      type: Schema.Types.Object,
      ref: 'User',
      required: [true, 'CreateBy required!'],
    },
    mobiltangki: {
      type: Schema.Types.Object,
      ref: 'MobilTangki',
      required: [true, 'Mobil tangki required!'],
    },
    status: {
      type: String,
      trim: true,
      enum: ['Waiting', 'Request', 'Approved', 'Rejected'], // 0=waiting, 1=request, 2=approve, 3=rejected
      required: [true, 'Status required!'],
    },
    ritase: {
      type: Number,
      trim: true,
    },
    odoKM: {
      type: Number,
      trim: true,
    },
    HSSE: {
      type: String,
      trim: true,
    },
    PWSAMT: {
      type: String,
      trim: true,
    },
    TBBM: {
      type: String,
      trim: true,
    },
    remarks: {
      type: String,
      trim: true,
    },
    imgUrl: {
      type: String,
      trim: true,
    },
    kondisiRem: {
      type: Number,
      trim: true,
    },
    kondisiRemReason: {
      type: String,
      trim: true,
    },
    kondisiBan: {
      type: Number,
      trim: true,
    },
    kondisiBanReason: {
      type: String,
      trim: true,
    },
    kondisiWiper: {
      type: Number,
      trim: true,
    },
    kondisiWiperReason: {
      type: String,
      trim: true,
    },
    kondisiLampu: {
      type: Number,
      trim: true,
    },
    kondisiLampuReason: {
      type: String,
      trim: true,
    },
    kondisiKompartemen: {
      type: Number,
      trim: true,
    },
    kondisiKompartemenReason: {
      type: String,
      trim: true,
    },
    kondisiApar: {
      type: Number,
      trim: true,
    },
    kondisiAparReason: {
      type: String,
      trim: true,
    },
    kondisiOliMesin: {
      type: Number,
      trim: true,
    },
    kondisiOliMesinReason: {
      type: String,
      trim: true,
    },
    kondisiAirRadiator: {
      type: Number,
      trim: true,
    },
    kondisiAirRadiatorReason: {
      type: String,
      trim: true,
    },
    keberadaanSTNK: {
      type: Number,
      trim: true,
    },
    keberadaanSTNKReason: {
      type: String,
      trim: true,
    },
    keberadaanSuratKeur: {
      type: Number,
      trim: true,
    },
    keberadaanSuratKeurReason: {
      type: String,
      trim: true,
    },
    keberadaanSuratTera: {
      type: Number,
      trim: true,
    },
    keberadaanSuratTeraReason: {
      type: String,
      trim: true,
    },
    keberadaanP3K: {
      type: Number,
      trim: true,
    },
    keberadaanP3KReason: {
      type: String,
      trim: true,
    },
    keberadaanFlameTrap: {
      type: Number,
      trim: true,
    },
    keberadaanFlameTrapReason: {
      type: String,
      trim: true,
    },
    keberadaanBanSerep: {
      type: Number,
      trim: true,
    },
    keberadaanBanSerepReason: {
      type: String,
      trim: true,
    },
    keberadaanToolkit: {
      type: Number,
      trim: true,
    },
    keberadaanToolKitReason: {
      type: String,
      trim: true,
    },
    keberadaanGroundingCable: {
      type: Number,
      trim: true,
    },
    keberadaanGroundingCableReason: {
      type: String,
      trim: true,
    },
    keberadaanSelangBongkar: {
      type: Number,
      trim: true,
    },
    keberadaanSelangBongkarReason: {
      type: String,
      trim: true,
    },
    keberadaanSpillKit: {
      type: Number,
      trim: true,
    },
    keberadaanSpillKitReason: {
      type: String,
      trim: true,
    },
    membawaSIM: {
      type: Number,
      trim: true,
    },
    membawaSIMReason: {
      type: String,
      trim: true,
    },
    membawaSuratIjinArea: {
      type: Number,
      trim: true,
    },
    membawaSuratIjinAreaReason: {
      type: String,
      trim: true,
    },
    membawaBukuSaku: {
      type: Number,
      trim: true,
    },
    membawaBukuSakuReason: {
      type: String,
      trim: true,
    },
    membawaCatatanPerjalanan: {
      type: Number,
      trim: true,
    },
    membawaCatatanPerjalananReason: {
      type: String,
      trim: true,
    },
    menggunakanSeragam: {
      type: Number,
      trim: true,
    },
    menggunakanSeragamReason: {
      type: String,
      trim: true,
    },
    menggunakanSafetyShoes: {
      type: Number,
      trim: true,
    },
    menggunakanSafetyShoesReason: {
      type: String,
      trim: true,
    },
    menggunakanSafetyHelm: {
      type: Number,
      trim: true,
    },
    menggunakanSafetyHelmReason: {
      type: String,
      trim: true,
    },
    menggunakanIDCard: {
      type: Number,
      trim: true,
    },
    menggunakanIDCardReason: {
      type: String,
      trim: true,
    },
    menggunakanSarungTangan: {
      type: Number,
      trim: true,
    },
    menggunakanSarungTanganReason: {
      type: String,
      trim: true,
    },
    menggunakanJasHujan: {
      type: Number,
      trim: true,
    },
    menggunakanJamHujanReason: {
      type: String,
      trim: true,
    },
    approvedBy: {
      type: {
        type: Schema.Types.Object,
        ref: 'User',
      },
      // type: Schema.Types.Object,
      // ref: 'User',
    },
    rejectedReason: {
      type: String,
      trim: true,
    },
  },
  {
    // createdAt: { type: Date, default: Date.now },
    timestamps: true,
  }
)

schema.plugin(mongoosePaginate)
schema.plugin(uniqueValidator, {
  message: '{VALUE} already registered',
})
const CheckList = mongoose.model('CheckList', schema)

const create = async data => {
  return await CheckList.create({
    ...data,
    _id: uuidv1(),
  })
}

const read = async () => {
  return await CheckList.find()
}

const readId = async id => {
  return await CheckList.findOne({
    // _id: ObjectId(id)
    _id: id,
  })
}

const update = async (id, data) => {
  return await CheckList.findOneAndUpdate(
    // { _id: ObjectId(id) },
    { _id: id },
    { $set: data },
    { upsert: true, new: true }
  )
}

const destroy = id => {
  // return await MobilTangki.deleteOne({ _id: ObjectId(id) })
  CheckList.findOneAndDelete({ _id: id }, async err => {
    if (err) return await false
    return await true
  })
}

module.exports = { CheckList, create, read, readId, update, destroy }
