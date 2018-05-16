const expect = require('expect');
const request = require ('supertest');

const {app} = require('./../LibTravel_API/API/controller')

describe('POST /search', ()=>{
    it('should create a new search', (done) =>{
        
        request(app)
        .post('/search')
            .send({"word": "chandana","filter": "author"})
            .expect(200)
            .expect((res)=>{
                expect(res.text).toBe('{"3001":"http://www.fb.com","3002":"http://www.3002.com"}')
            })
            .end((err, res)=>{
                if (err){
                    return done(err)
                }
                done()   
            })
    }).timeout(5000)

    it('should create a new search', (done) => {

        request(app)
            .post('/search')
            .send({ "word": "martin", "filter": "author" })
            .expect(200)
            .expect((res) => {
                expect(res.text).toBe('{"3002":"http://www.3002.com"}')
            })
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                done()
            })
    }).timeout(5000)


})