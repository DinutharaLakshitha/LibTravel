const expect = require('expect');

const searchHandler = require('./../super_peer1/searchHandler')

it('Should search in the database for martin',(done)=>{

    var req = {"body":{"filter":'author','word':'martin'}}

    searchHandler.searchInLib(req, (availability) => {
        console.log(availability.author)
        done()

})
})

it('Should search in the database for chandana', (done) => {

    var req = { "body": { "filter": 'author', 'word': 'chandana' } }

    searchHandler.searchInLib(req, (availability) => {
        console.log(availability.author)
        done()

    })
})

it('Should search in the database for oben samuganimi', (done) => {

    var req = { "body": { "filter": 'title', 'word': 'oben' } }

    searchHandler.searchInLib(req, (availability) => {
        console.log(availability.author)
        done()

    })
})
