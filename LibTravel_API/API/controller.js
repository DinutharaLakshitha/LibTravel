
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
//var cors = require('cors')


var app = express();
//app.use(cors())
app.use(bodyParser.json());

app.use(function (req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");

    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();

});


/*app.use(function (req, res, next) {

    // Website you wish to allow to connect
    //res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});*/
//app.options('/search', cors())
app.post('/search', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let resItem = new (require('./models/resultItem'))
    requestHandler.requestToNeighbours(req, res, (result) =>
        resItem.addResult(result)
        
    );
    setTimeout(() => {
        var send = resItem.getResultItem()
        console.log(send)
        res.send(JSON.stringify(send));
    }, 4000)
});
app.post('/library/register', (req, res) => {
    var body = _.pick(req.body, ['userName', 'password', 'url']);
    var lib = new library(body);

    lib.save().then(() => {
        return lib.genarateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(lib);
    }).catch((e) => {
        res.status(400).send(e);
    })
});

app.get('/library/delete', authenticate, (req, res) => {
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

app.delete('/library/token', authenticate, (req, res) => {
    req.lib.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
})



app.listen(port, () => {
    console.log(`started on port ${port}`);
});