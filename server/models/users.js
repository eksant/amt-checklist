const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const uniqueValidator = require("mongoose-unique-validator");
const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;

var validateEmail = email => {
  var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

const schema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Username required!"],
      validate: /([a-z])\w+/
    },
    NIP: {
      type: String,
      trim: true,
      // unique: true,
      required: [true, "NIP required!"],
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
      required: [true, "Email required!"],
      validate: [validateEmail, "Please fill a valid email address!"]
    },
    mobile: {
      type: String,
      trim: true
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password required!"]
    },
    roles: {
      type: String,
      enum: ["superadmin", "admin", "sopir", "kernet"],
      required: [true, "Roles required!"]
    },
    status: {
      type: Number,
      enum: ["0", "1"],
      required: [true, "Status required!"]
    },
    imgUrl: {
      type: String
    }
  },
  {
    createdAt: { type: Date, default: Date.now }
  }
);

schema.plugin(mongoosePaginate);
schema.plugin(uniqueValidator, {
  message: "{VALUE} already registered"
});
const User = mongoose.model("User", schema);

const create = (data, callback) => {
  User.create(data, (error, data) => {
    if (!error) callback(null, data);
    else {
      callback(error, null);
    }
  });
};

const read = callback => {
  User.find((error, users) => {
    if (!error) {
      callback(null, users);
    } else {
      callback(error, null);
    }
  });
};

const readId = (id, callback) => {
  User.find({ _id: ObjectId(id) }, (error, user) => {
    if (!error) {
      callback(null, user);
    } else {
      callback(error, null);
    }
  });
};

const signIn = (username, callback) => {
  User.find(
    {
      username: username,
      status: 1
    },
    (error, user) => {
      if (!error) {
        callback(null, user);
      } else {
        callback(error, null);
      }
    }
  );
};

const update = (id, data, callback) => {
  User.findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: data },
    { upsert: true, new: true },
    (error, data) => {
      if (!error) {
        callback(null, data);
      } else {
        callback(error, null);
      }
    }
  );
};

const destroy = (id, callback) => {
  User.remove({ _id: ObjectId(id) }, error => {
    if (!error) {
      callback(null);
    } else {
      callback(error);
    }
  });
};

module.exports = { User, create, read, readId, update, destroy, signIn };
