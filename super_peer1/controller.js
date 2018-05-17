
var express = require('express');
var bodyParser = require('body-parser');
const request = require('request');

var searchHandler = require('./searchHandler');
var requestHandler = require('./requestHandler');
var resultItem = require('./models/resultItem');

var app = express();

app.use(bodyParser.json());

app.post('/search', (req, res) => {                                     //search rout,all search requests will come along this rout

    let resItem = new (require('./models/resultItem'))
    resItem.addResult(JSON.stringify({}))
    requestHandler.requestToNeighbours(req, res, (result) =>            //search around the peers
        resItem.addResult(result)
    );

    searchHandler.searchInLib(req, (availability) => {                  //search in the library
        resItem.addResult(availability)
    })

    setTimeout(() => {                                                  //after a timeout result sent 
        var response = resItem.getResultItem().replace(/}{/g, ",")
        var response = response.replace(/,,/g, ",")
        console.log(JSON.parse("{" + response.substr(2)))
        res.send(JSON.stringify(JSON.parse("{" + response.substr(2))));
    }, 3000)


});

app.listen(3001, () => {
    console.log('started on port 3001');
});