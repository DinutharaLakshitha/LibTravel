const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');


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
    unique:true,
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


var library = mongoose.model('library', librarySchema);
module.exports = { library };
