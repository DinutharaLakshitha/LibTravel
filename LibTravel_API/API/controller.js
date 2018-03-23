
const express = require('express');
const bodyParser = require('body-parser');
const _= require('lodash')
const port = process.env.PORT || 3000;

var {mongoose} = require('./utilities/mongoose');
var {library} = require('./models/library');
var {searchObject} = require('./models/searchObject');
var requestHandler = require('./requestHandler');
var resultItem = require('./models/resultItem');


 var app = express();

 app.use(bodyParser.json());

/*app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
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

 app.post('/search',(req,res)=>{
    // console.log("Main system got the request");
     let resItem = new (require('./models/resultItem'))
     //console.log('resIttem created')
    //console.log(req.body)
     requestHandler.requestToNeighbours(req, res, (result) =>
        resItem.addResult(result)
        // results += result
     );
     setTimeout(() => {
         //console.log(resItem.getResultItem())
         var send = resItem.getResultItem()
         //console.log(send)
         //resItem.clearItem()
        // console.log("results",resItem.getResultItem())
         
         //send = results.replace(/}{/g, ",");
         //results = ""
         res.send(JSON.stringify(send));
     }, 4000)
 });
app.post('/reglibrary', (req, res) => {
    var body = _.pick(req.body,['userName','password','url']);
    var lib = new library(body);

    lib.save().then(()=>{
        return lib.genarateAuthToken();
    }).then((token)=>{
        res.header('x-auth',token).send(lib);
    }).catch((e)=>{
        res.status(400).send(e);
    })
});



 app.listen(port,()=>{
     console.log(`started on port ${port}`);
 });