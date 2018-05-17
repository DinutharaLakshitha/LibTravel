const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')


var librarySchema = new mongoose.Schema({                   //library sceme
  userName: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  url: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isURL,
      message: 'not a URL'
    }
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }],
  availability: {
    type: Boolean,
    default: true
  }
});

librarySchema.methods.genarateAuthToken = function () {                             //Method to genarate authentication tokens
  var lib = this;
  var access = 'auth';
  var token = jwt.sign({ _id: lib._id.toHexString(), access }, 'abc123').toString();//salting

  lib.tokens = lib.tokens.concat([{ access, token }]);



  return lib.save().then(() => {
    return token;
  });
};

librarySchema.methods.removeToken = function (token) {                                //Method to remove authenticate token from a library
  var lib = this;

  return lib.update({
    $pull: {
      tokens: { token }
    }
  });
}

librarySchema.statics.findByToken = function (token) {                                //method to search in the database by the authentication token
  var library = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject();
  }

  return library.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
}

librarySchema.statics.findByCredentials = function (userName, password) {             //get library details by the username and password
  var library = this;

  return library.findOne({ userName }).then((lib) => {
    if (!lib) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, lib.password, (err, res) => {
        if (res) {
          resolve(lib)
        } else {
          reject();
        }
      });
    });
  });
}

librarySchema.pre('save', function (next) {                                           //this method is used to hash the password
  var lib = this;

  if (lib.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {                                               //password salting
      bcrypt.hash(lib.password, salt, (err, hash) => {
        lib.password = hash;
        next();
      });
    });
  } else {
    next();
  }

});




var library = mongoose.model('library', librarySchema);
module.exports = { library };
