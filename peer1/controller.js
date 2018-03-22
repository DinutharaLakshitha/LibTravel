
var express = require('express');
var bodyParser = require('body-parser');
const request = require('request');

var searchHandler = require('./searchHandler');
var requestHandler = require('./requestHandler');
var resultItem = require('./models/resultItem');

var app = express();

app.use(bodyParser.json());

app.post('/search', (req, res) => {

    let resItem = new (require('./models/resultItem'))
    console.log('resIttem created')
    resItem.addResult(JSON.stringify({}))
    requestHandler.requestToNeighbours(req, res, (result) =>
        resItem.addResult(result)
    );
    searchHandler.searchInLib(req, (availability) => {
        resItem.addResult(availability)
    })
    setTimeout(() => {
        //console.log(results)
        var response = resItem.getResultItem().replace(/}{/g, ",")
        console.log(JSON.parse("{" + response.substr(2)))
        res.send(JSON.stringify(JSON.parse("{" + response.substr(2))));
    }, 2000)


});

app.listen(3002, () => {
    console.log('started on port 3002');
});