
const message = require('../utils');
const chai = require('chai');
const chaiHTTP = require('chai-http')
const app = require('../app');

const { readLatestEntry, readFromDB, writeToDB } = require('../database/io.js');

const host = process.env.APP_URL || app;

console.log(process.env.APP_URL);
//Assertion Style
chai.should();
chai.use(chaiHTTP);


describe('Make sure read and writes work from cloudant', () => {
    let dateTime = currentDateTime();
    it('verifies that the correct db table gets written to', (done) => {
        writeToDB(testDbName, {data: "testdata"}, dateTime)
        .then(result => {
            expect(result).to.be.an('object');
            expect(result).to.include({id: dateTime});
            done();
        })
        .catch(err => {
            done(err);
        });
    });

    //{"docs":[
    //  {"_id":"2021/04/30 11:36:25",
    //  "_rev":"1-22af5ece874c3f504839159abb443691",
    //  "data":"testdata"}], 
    //...}
    //result["docs"][0]["_id"] DATE
    //result["docs"][0]["data"] DATA
    it('find the entry with {_id: dateTime, data: "testdata"} from the db, written in previous test', (done) => {
        readLatestEntry("test")
        .then(result => {
            expect(result).to.be.an('object');
            expect(result.docs[0]).to.include({"_id": dateTime});
            expect(result.docs[0]).to.include({"data": "testdata"});
            done();
        })
        .catch(err => {
            done(err);
        });
    });
});

/**
 * Integration test to make sure that the GET /user route
 * is reachable.
 */
describe('Sensor API', () => {
    /**
     * Test the GET routes
     */
    describe('GET /api/sensor/airquality', () => {
        it('It should GET an airquality object', (done) => {
            chai.request(host)
                .get("/api/sensor/airquality")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.should.be.a('object');
                    done(err);
            });
        });

        it('It should not GET an object', (done) => {
            chai.request(host)
                .get("/api/sensor/airqualit")
                .end((err, response) => {
                    response.should.have.status(404);
                    done(err);
            })
        });

    });

    describe('GET /api/sensor/people', () => {
        it('It should GET a people object', (done) => {
            chai.request(host)
                .get("/api/sensor/people")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.should.be.an('object');
                    done(err);
            });
        });

        it('It should not GET a people object', (done) => {
            chai.request(host)
                .get("/api/sensor/peopl")
                .end((err, response) => {
                    response.should.have.status(404);
                    done(err);
            })
        });
    })

    /**
     * Test the POST routes
     */
    describe('POST /api/sensor/airquality', () => {
        //beforeEach()
        const airquality = {
            _id: 'delete',
            data: 50
        };

        it('It should POST new people data', (done) => {
            chai.request(host)
                .post('/api/sensor/airquality')
                .send(airquality)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.should.be.an('object');
                    done(err);
            })
        });
        
        it('It should not POST new people data', (done) => {
            chai.request(host)
                .post('/api/sensor/airqualit')
                .send(airquality)
                .end((err, response) => {
                    response.should.have.status(404);
                    done(err);
                })
        });
    })
})
