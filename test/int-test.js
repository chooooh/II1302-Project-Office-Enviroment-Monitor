/**
 * @fileoverview This file implements the integration tests. The scope
 * is primarily the routes and database functions.
 * Dependencies are server app instance, chai, chai-http that handles allows
 * http test requests.
 * TODO
 *  - ta bort alla förutom 1 404 tester
 */
const chai = require('chai');
const chaiHTTP = require('chai-http')
const app = require('../app');
//const { v4: uuidv4 } = require('uuid');

const { currentDateTime } = require('../utils');
const { readLatestEntry, readFromDB, writeToDB } = require('../database/io');

// Either perform tests on test deploy site or app instance.
const host = process.env.APP_URL || app;

// Uses the "should" interface.
chai.should();
chai.use(chaiHTTP);

/**
 * Performs database tests.
 */
describe('Make sure read and writes work from cloudant', () => {
    const testDbName = 'test';
    const dateTime = currentDateTime();

    it('verifies that the correct db table gets written to', (done) => {
        writeToDB(testDbName, {data: "testdata"}, dateTime)
        .then(result => {
            result.should.be.an('object');
            result.should.include({ok: true});
            done();
        })
        .catch(err => {
            done(err);
        });
    });

    it('find the entry with {date: dateTime, data: "testdata"} from the db, written in previous test', (done) => {
        readLatestEntry(testDbName)
        .then(result => {
            result.should.be.an('object');
            result.docs[0].should.include({"date": dateTime});
            result.docs[0]["data"].should.include({"data": "testdata"});
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
    describe('GET 404 route', () => {
        it('It should not GET an object', (done) => {
            chai.request(host)
                .get("/api/sensor/nonexistentroute")
                .end((err, response) => {
                    response.should.have.status(404);
                    done(err);
            });
        });
    });

    describe('GET /api/sensor/gases', () => {
        it('It should GET an gas object', (done) => {
            chai.request(host)
                .get("/api/sensor/gases")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.should.be.a('object');
                    response.body.data.should.include.all.keys(['carbon', 'volatile']);
                    done(err);
            });
        });
    });

    describe('GET /api/sensor/temperature', () => {
        it('It should GET a temperature object', (done) => {
            chai.request(host)
                .get("/api/sensor/temperature")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.should.be.a('object');
                    response.body.data.should.include.all.keys(['temperature']);
                    done(err);
            });
        });
        // lägg till en för 400
    });

    describe('GET /api/sensor/humidity', () => {
        it('It should GET a humidity object', (done) => {
            chai.request(host)
                .get("/api/sensor/humidity")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.should.be.a('object');
                    response.body.data.should.include.all.keys(['humidity']);
                    done(err);
            });
        });
        // lägg till en för 400
    });
    
    /*
    describe('GET /api/sensor/people', () => {
        it('It should GET a people object', (done) => {
            chai.request(host)
                .get("/api/sensor/people")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.should.be.a('object');
                    //response.body.docs[0].data.should.include.all.keys(['people']);
                    done(err);
            });
        });
        // lägg till en för 400
    });

    describe('POST /api/sensor/', () => {
        it('it should not POST new data', (done) => {
            chai.request(host)
                .post('/api/sensor/?qwoe=23')
                .end((err, res) => {
                    console.log(err);
                    done(err);
                })
        })
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
    */

});
