const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')


var librarySchema = new mongoose.Schema({
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

librarySchema.methods.genarateAuthToken = function () {
  var lib = this;
  var access = 'auth';
  var token = jwt.sign({ _id: lib._id.toHexString(), access }, 'abc123').toString();

  lib.tokens = lib.tokens.concat([{ access, token }]);



  return lib.save().then(() => {
    return token;
  });
};

librarySchema.statics.findByToken = function (token) {
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

librarySchema.pre('save', function (next) {
  var lib = this;

  if (lib.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
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
