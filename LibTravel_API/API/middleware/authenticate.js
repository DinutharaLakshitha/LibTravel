var {library} = require('./../models/library');

var authenticate = (req, res, next) => {
    var token = req.header('x-auth');
    library.findByToken(token).then((lib) => {
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

module.exports = {authenticate}