var mongoose = require('mongoose');

var searchObject = mongoose.model('searchObject', {
    keyWord: {
        type: String
    },
    filter: {
        type: String
    }
});

module.exports = { searchObject };