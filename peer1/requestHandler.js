const request = require('request');
var neighbours = [];
var peerResults = "";
var temp

exports.requestToNeighbours = function (req, res, callback) {
    if (neighbours.length > 0) {
        for (i in neighbours) {
            request({
                url: neighbours[i],
                method: 'POST',
                json: req.body,
            }, (error, response, body) => {
                if (error) {
                    console.log("peer not online")
                    peerResults += ""
                }
                else {
                    peerResults += JSON.stringify(body);
                }
                //console.log(peerResults)
            });

        }
        setTimeout(() => {
            temp = peerResults.replace(/{}/g, "")
            peerResults = ""
            callback(temp)
        }, 1500)
    }
}
