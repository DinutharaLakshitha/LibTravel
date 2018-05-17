var { library } = require('./../models/library');

var authenticate = (req, res, next) => {                  //This middleware is used to authenticate the users
    var token = req.header('x-auth');                     //Get the token from the request header
    library.findByToken(token).then((lib) => {            //this token is used to search in the library
        if (!lib) {
            return Promise.reject();
        }
        req.lib = lib;
        req.token = token;
        next();
    }).catch((e) => {
        res.status(401).send();
    })
}

module.exports = { authenticate }                          //the module is exported