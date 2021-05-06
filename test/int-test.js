/**
 * @fileoverview This file implements the integration tests. The scope
 * is primarily the routes and database functions.
 * Dependencies are server app instance, chai, chai-http that handles allows
 * http test requests
 * @package
 */
const chai = require('chai');
const chaiHTTP = require('chai-http')
const app = require('../app');
//const { v4: uuidv4 } = require('uuid');

const { currentDateTime } = require('../utils');
const { readLatestEntry, readFromDB, writeToDB } = require('../database/io');

const host = process.env.APP_URL || app;

chai.should();
chai.use(chaiHTTP);

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
            //const isUUID = validate(result.docs[0]["_id"].substr(5));
            //isUUID.should.be.true(isUUID);
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

    /**
     * Test the POST routes
     */
    describe('POST /api/sensor/airquality', () => {
 
        it('It should POST new airquality data', (done) => {
            chai.request(host)
                .post('/api/sensor/airquality?carbon=50&volatile=50')
                .send(airquality)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.should.be.an('object');
                    done(err);
            })
        });
        
        it('It should not POST new airquality data', (done) => {
            chai.request(host)
                .post('/api/sensor/airqualit')
                .send(airquality)
                .end((err, response) => {
                    response.should.have.status(404);
                    done(err);
                });
        });
    });
    
    /*
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
