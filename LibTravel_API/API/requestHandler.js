
const request = require('request');
var neighbours = ['http://localhost:3001/search'];
var peerResults = "";
var temp

exports.requestToNeighbours = function (req, res, callback) {
    if (neighbours.length > 0) {
        for (i in neighbours) {
            request({
                url: neighbours[i],
                method: 'POST',
                json: req.body,
                //timeout : 1000
            }, (error, response, body) => {
                if (error) {
                    console.log("peer not online")
                    peerResults += ""
                }
                else {
                    peerResults += JSON.stringify(body);
                }
            });

        }
        setTimeout(() => {
            temp = peerResults.replace(/{}/g, "")
            peerResults = ""
            callback(temp)
        }, 3500)
    }
}




