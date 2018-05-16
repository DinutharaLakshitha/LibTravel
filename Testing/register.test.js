const expect = require('expect');
const request = require('supertest');

const { app } = require('./../LibTravel_API/API/controller')
const { library } = require('./../LibTravel_API/API/models/library')

beforeEach((done)=>{
    library.remove({}).then(()=>done())
})

describe('POST /library/register', () => {
    it('should create a new library', (done) => {

        request(app)
            .post('/library/register')
            .send({
                "userName": "dinuthara",
                "password": "someValue",
                "url": "http://www.dinuthara.com"
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.userName).toBe('dinuthara')
            })
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                library.find().then((lib)=>{
                    expect(lib.length).toBe(1)
                    done()
                })
            })
    })

    it('should create a new library', (done) => {

        request(app)
            .post('/library/register')
            .send({
                "userName": "3004",
                "password": "123abc!",
                "url": "http://www.3004.com"
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.userName).toBe('3004')
            })
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                library.find().then((lib) => {
                    expect(lib.length).toBe(1)
                    done()
                })
            })
    })

    


})