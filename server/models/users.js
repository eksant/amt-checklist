const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcryptjs')
const ObjectId = mongoose.Types.ObjectId
const Schema = mongoose.Schema

// var validateEmail = email => {
// 	var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
// 	return regex.test(email)
// }

const schema = new Schema(
  {
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

const create = (data, callback) => {
  User.create(data, (error, data) => {
    if (!error) callback(null, data)
    else {
      callback(error, null)
    }
  })
}

const read = callback => {
  User.find((error, users) => {
    if (!error) {
      callback(null, users)
    } else {
      callback(error, null)
    }
  })
}

const readId = (id, callback) => {
  User.find({ _id: ObjectId(id) }, (error, user) => {
    if (!error) {
      callback(null, user)
    } else {
      callback(error, null)
    }
  })
}

const signIn = (username, password, callback) => {
  if (!username || !password) {
    throw 'You must send the username and the password!'
    // callback('You must send the username and the password!', null)
  }
  User.findOne({ username: username }, (error, user) => {
    if (!error) {
      if (!user) throw 'Username not found!'
      bcrypt.compare(password, user.password, (error, success) => {
        if (error) {
          callback(error, null)
        } else if (!success) {
          callback('Invalid username or password!', null)
        } else {
          callback(null, user)
        }
      })
    } else {
      callback(error, null)
    }
  })
}

const update = (id, data, callback) => {
  User.findOneAndUpdate(
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
  User.findOneAndDelete({ _id: ObjectId(id) }, error => {
    if (!error) {
      callback(null)
    } else {
      callback(error)
    }
  })
}

module.exports = { User, create, read, readId, update, destroy, signIn }
