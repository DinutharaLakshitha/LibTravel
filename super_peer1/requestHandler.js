const request = require('request');
var neighbours = ['http://85170705.ngrok.io/search','http://7ff7e8fd.ngrok.io/search'];
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
                    peerResults+=""
                 }
                 else{
                    peerResults += JSON.stringify(body);
                    console.log(body)
                 }
                console.log(body);
                
                //console.log(peerResults)
            });

        }
        setTimeout(() => {
            temp = peerResults.replace(/{}/g,"")
            peerResults = ""
            callback(temp)
        }, 2500)
    }
}





