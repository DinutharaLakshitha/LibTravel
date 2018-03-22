let sendAvailability = function () {
    return new Promise(function (resolve, reject) {
        res.write(JSON.stringify({ text: '3001 is online' }, undefined, 2));
        resolve("Availability")
    })
}
let sendLibData = function () {
    return new Promise(function (resolve, reject) {
        res.write(JSON.stringify(searchHandler.searchInLib(req), undefined, 2));
        resolve("LibData")
    })
}
let sendPeerData = function () {
    return new Promise(function (resolve, reject) {
        requestHandler.requestToNeighbours(req, res);
        resolve("PeerData")
    })
}

sendLibData().then(function (LibData) {
    console.log(LibData);
    return sendPeerData();
}).then(function (PeerData) {
    console.log(PeerData);
    return sendAvailability();
}).then(function (Availability) {
    console.log(Availability);

})