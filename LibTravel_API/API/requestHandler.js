
const request = require('request');
var neighbours = ['http://93f1b725.ngrok.io/search', 'http://6134189e.ngrok.io/search'];        //neighbourhood library list(peers)
//var neighbours = ['http://localhost:3001/search']                                             // used for devalopment purposes
var peerResults = "";
var temp

exports.requestToNeighbours = function (req, res, callback) {
    if (neighbours.length > 0) {
        for (i in neighbours) {
            request({                                                   //setting up the request
                url: neighbours[i],
                method: 'POST',
                json: req.body,
            }, (error, response, body) => {
                if (error) {                                            //if any errors it is most likely to be the peer is offline
                    console.log("peer not online")
                    peerResults += ""
                }
                else {
                    peerResults += JSON.stringify(body);                //the search result is collected
                }
            });

        }
        setTimeout(() => {                                              //after a timeout result sent
            temp = peerResults.replace(/{}/g, "")
            peerResults = ""
            callback(temp)
        }, 3500)
    }
}




