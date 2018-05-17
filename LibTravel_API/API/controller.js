
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash')
const port = process.env.PORT || 3000;

var { mongoose } = require('./utilities/mongoose');
var { library } = require('./models/library');
var { searchObject } = require('./models/searchObject');
var requestHandler = require('./requestHandler');
var resultItem = require('./models/resultItem');
var { authenticate } = require('./middleware/authenticate')


var app = express();
app.use(bodyParser.json());

app.use(function (req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");                                                     // Website you wish to allow to connect

    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,x-auth");// Request headers you wish to allow

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');            // Request methods you wish to allow

    next();

});


app.post('/search', (req, res) => {                                                 //search rout,all search requests will come along this rout
    res.setHeader('Access-Control-Allow-Origin', '*');
    let resItem = new (require('./models/resultItem'))
    requestHandler.requestToNeighbours(req, res, (result) =>
        resItem.addResult(result)

    );
    setTimeout(() => {                                                              //after a time out the search result sent to the costomer
        var send = resItem.getResultItem()
        console.log(send)
        res.status(200).send(JSON.stringify(send));
    }, 4000)
});
app.post('/library/register', (req, res) => {                                       //rout to register to the library system
    var body = _.pick(req.body, ['userName', 'password', 'url']);
    var lib = new library(body);

    lib.save().then(() => {
        return lib.genarateAuthToken();
    }).then((token) => {
        res.status(200).header('x-auth', token).send(lib);
    }).catch((e) => {
        res.status(400).send(e);
    })
});

app.get('/library/delete', authenticate, (req, res) => {                            //rout to delete libraries from the 
    res.send(req.lib)
});

app.post('/library/login', (req, res) => {
    var body = _.pick(req.body, ['userName', 'password'])
    library.findByCredentials(body.userName, body.password).then((lib) => {
        return lib.genarateAuthToken().then((token) => {
            res.header('x-auth', token).send(lib);
        });
    }).catch((e) => {
        res.status(400).send()
    })
});

app.delete('/library/token', authenticate, (req, res) => {                          //rout to remove authentication tokens ex.logout
    req.lib.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
})



app.listen(port, () => {
    console.log(`started on port ${port}`);
});

module.exports = { app };