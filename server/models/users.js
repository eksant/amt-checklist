const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const uniqueValidator = require('mongoose-unique-validator')
const uuidv1 = require('uuid/v1')
const bcrypt = require('bcryptjs')
const ObjectId = mongoose.Types.ObjectId
const Schema = mongoose.Schema

// var validateEmail = email => {
// 	var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
// 	return regex.test(email)
// }

const schema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv1(),
    },
    username: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, 'Username required!'],
      validate: /([a-z])\w+/,
    },
    NIP: {
      type: String,
      trim: true,
      // unique: true,
      required: [true, 'NIP required!'],
    },
    fullName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, 'Email required!'],
      // validate: [validateEmail, 'Please fill a valid email address!'],
    },
    mobile: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
      required: [true, 'Password required!'],
    },
    roles: {
      type: String,
      enum: ['Superadmin', 'Admin', 'Sopir', 'Kernet'],
      required: [true, 'Roles required!'],
    },
    status: {
      type: String,
      enum: ['Active', 'NonActive'],
      required: [true, 'Status required!'],
    },
    imgUrl: {
      type: String,
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
const User = mongoose.model('User', schema)

const signIn = (username, password, callback) => {
  if (!username || !password) {
    // throw 'You must send the username and the password!'
    callback('You must send the username and the password!', null)
  } else {
    User.findOne({ username: username }, (error, user) => {
      if (!error) {
        if (!user) {
          // throw 'Username not found!'
          callback('Username not found!', null)
        } else {
          bcrypt.compare(password, user.password, (error, success) => {
            if (error) {
              callback(error, null)
            } else if (!success) {
              callback('Invalid username or password!', null)
            } else {
              callback(null, user)
            }
          })
        }
      } else {
        callback(error, null)
      }
    })
  }
}

const createAdmin = async data => {
  return await User.create({
    ...data,
    roles: 'Admin',
    _id: uuidv1(),
  })
}

const createUser = async data => {
  return await User.create({
    ...data,
    _id: uuidv1(),
  })
}

const readAdmin = async () => {
  return await User.find({ roles: 'Admin' })
}

const readAdminId = async id => {
  return await User.findOne({
    _id: ObjectId(id),
    roles: 'Admin',
  })
}

const readUser = async () => {
  return await User.find({ roles: { $in: ['Sopir', 'Kernet'] } })
}

const readUserId = async id => {
  return await User.findOne({
    _id: ObjectId(id),
    roles: { $in: ['Sopir', 'Kernet'] },
  })
}

const update = async (id, data) => {
  return await User.findOneAndUpdate(
    // { _id: ObjectId(id) },
    { _id: id },
    { $set: data },
    { upsert: true, new: true }
  )
}

const destroy = id => {
  User.findOneAndDelete({ _id: id }, async err => {
    if (err) return await false
    return await true
  })
}

module.exports = {
  User,
  createAdmin,
  createUser,
  readAdmin,
  readAdminId,
  readUser,
  readUserId,
  update,
  destroy,
  signIn,
}
