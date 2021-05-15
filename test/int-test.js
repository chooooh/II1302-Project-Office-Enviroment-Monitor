/**
 * @fileoverview This file implements the integration tests. The scope
 * is primarily the routes and database functions.
 * Dependencies are server app instance, chai, chai-http that handles allows
 * http test requests.
 */
const chaiHTTP = require('chai-http')
const app = require('../app');

const chai = require('chai');
chai.should();
const { currentDateTime } = require('../utils');
const { readLatestEntry, writeToDB } = require('../database/io');

// Either perform tests on test deploy site or app instance.
const host = process.env.APP_URL || app;

// Uses the "should" interface.
chai.use(chaiHTTP);

/**
 * Performs database tests.
 */
describe('Cloudant testing', () => {
    const testDbName = 'test';
    const dateTime = currentDateTime();

    it('verifies that the a db can be written to', (done) => {
        writeToDB(testDbName, {data: "testdata"}, dateTime)
        .then(response => {
            response.should.be.an('object');
            response.should.include({ok: true});
            done();
        })
        .catch(err => {
            done(err);
        });
    });

    it('find the entry with {date: dateTime, data: "testdata"} from the db, written in previous test', (done) => {
        readLatestEntry(testDbName)
        .then(response => {
            response.should.be.an('object');
            response.docs[0].should.include({"date": dateTime});
            response.docs[0]["data"].should.include({"data": "testdata"});
            done();
        })
        .catch(err => {
            done(err);
        });
    });

    it('should throw an error for duplicate id\'s', (done) => {
        writeToDB(testDbName, {data: "testdata"}, dateTime)
        .catch(err => {
            err.statusCode.should.not.equal('200');
            err.reason.should.include("Document update conflict");
            done();
        });
    });
});

/**
 * Integration test to make sure that the GET /user route
 * is reachable.
 */
describe('Sensor API', () => {

    describe('GET Routes', () => {

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
            it('It should GET a gas object', (done) => {
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
                    response.should.have.a('object')
                    response.body.data.should.include.all.keys(['temperature']);
                    done(err);
                });
            });
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
        });
    });

   
    describe('POST routes', () => {

        describe('POST /api/sensor/gases', () => {
            it('it should throw an error, invalid params', (done) => {
                chai.request(host)
                .post("/api/sensor/gases/?wrong=10&params=10")
                .end((err, response) => {
                    response.should.have.status(400);
                    done(err);
                });
            });
        });
        describe('POST /api/sensor/gases', () => {
            it('it should throw an error, one invalid param', (done) => {
                chai.request(host)
                .post("/api/sensor/gases/?carbon=50&wrongparam=2002")
                .end((err, response) => {
                    response.should.have.status(400);
                    done(err);
                });
            });
        });

        describe('POST /api/sensor/temperature', () => {
            it('it should throw an error, invalid params', (done) => {
                chai.request(host)
                .post("/api/sensor/temperature/?wrongparam=2002")
                .end((err, response) => {
                    response.should.have.status(400);
                    done(err);
                });
            })
        });

        describe('POST /api/sensor/humidity', () => {
            it('it should throw an error, invalid params', (done) => {
                chai.request(host)
                .post("/api/sensor/humidity/?wrongparam=2002")
                .end((err, response) => {
                    response.should.have.status(400);
                    done(err);
                });
            });
        });

        describe('POST /api/sensor/', () => {
            it('it should throw an error, invalid params', (done) => {
                chai.request(host)
                .post("/api/sensor/?wrongparam=2002")
                .end((err, response) => {
                    response.should.have.status(400);
                    done(err);
                });
            });
        });

    });

});
