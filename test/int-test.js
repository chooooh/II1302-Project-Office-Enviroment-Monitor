
const assert = require('assert');
const message = require('../utils');
const chai = require('chai');
const chaiHTTP = require('chai-http')
const app = require('../app');

const { currentDateTime } = require('../utils');
const { expect } = require('chai');
const { readLatestEntry, readFromDB, writeToDB } = require('../database/io.js');

const testDbName = 'test';
// const cfenv = require('cfenv');
// const appEnv = cfenv.getAppEnv();
// const host = appEnv.url;
// const host = process.env['ROUTE'] || 'http://localhost:3000/route'
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
 describe('Test GET /api/sensor/airquality', () => {
     it('It should return status code 200', (done) => {
         chai.request(app)
         .get("/api/sensor/airquality")
         .end((err, response) => {
             response.should.have.status(200);
             done(err);
            });
        });
        
        it('it should fetch latest airquality entry via a route', (done) => {
            chai.request(app)
            .get("/api/sensor/airquality")
            .end((err, response) => {
                response.should.have.status(200);
                done(err);
            })
        });
    });
    */

/**
 * Integration test to make sure that route for POST 
 * /api/sensor/airquality is reachable.

describe('Test POST data to /api/sensor/airquality', () => {
    it('It should return status code 200', (done) => {
        chai.request(app)
        .post("/api/sensor/airquality")
        .end((err, response) => {
            response.should.have.status(200);
            done(err);
        });
    });
});
*/

/**
 * Integration test to make sure that route for POST 
 * /api/sensor/airquality is reachable. 

describe('Test POST data to /api/sensor/peopleintheroom', () => {
    it('It should return status code 200', (done) => {
        chai.request(app)
        .post("/api/sensor/peopleintheroom")
        .end((err, response) => {
            response.should.have.status(200);
            done(err);
        });
    });
});
*/