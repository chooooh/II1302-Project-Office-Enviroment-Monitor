
const assert = require('assert');
const message = require('../utils');
const chai = require('chai');
const chaiHTTP = require('chai-http')
const app = require('../app');

const { currentDateTime } = require('../utils');
const { expect } = require('chai');

const testDbName = 'test';
// const cfenv = require('cfenv');
// const appEnv = cfenv.getAppEnv();
// const host = appEnv.url;
// const host = process.env['ROUTE'] || 'http://localhost:3000/route'
//Assertion Style
chai.should();

chai.use(chaiHTTP);


/*
describe('Make sure read and writes work from cloudant', () => {
    const { readFromDB, writeToDB } = require('../database/io.js');
    it('verify that db contains the entry {_id: test}', (done) => {
        writeToDB({data:"test"}, testDbName, "test").then(result => {
            expect(result).to.be.json;
            expect(result).to.include({data: "test"});
        });
        done();
    });
    it('retrieve the entry with {_id: test}', (done) => {
        readFromDB({data:"test"}, "test").then(result => {
            expect(result).to.be.json;
            expect(result).to.include({data: "test"});
        });
        done();
    });
});
*/

/**
 * Integration test to make sure that the GET /user route
 * is reachable.
 */
describe('Test GET /api/sensor/airquality', () => {
    it('It should return status code 200', (done) => {
        chai.request(app)
        .get("/api/sensor/airquality")
        .end((err, response) => {
            response.should.have.status(200);
            done(err);
        });
    });
/*
    it('it should fetch latest airquality entry', (done) => {
        chai.request(app)
        .get("/api/sensor/airquality")
        .end((err, response) => {
            response.should.have.status(200);
            done(err);
        })
    })
    */
});

/**
 * Integration test to make sure that route for POST 
 * /api/sensor/airquality is reachable.
 */
describe('Test POST data to /api/sensor/airquality', () => {
    it('It should return status code 200', (done) => {
        chai.request(app)
        .post("/api/sensor/airquality")
        .end((err, response) => {
            response.should.have.status(200);
            done();
        });
    });
});

/**
 * Integration test to make sure that route for POST 
 * /api/sensor/airquality is reachable. 

describe('Test POST data to /api/sensor/peopleintheroom', () => {
    it('It should return status code 200', (done) => {
        chai.request(app)
        .post("/api/sensor/peopleintheroom")
        .end((err, response) => {
            response.should.have.status(200);
            done();
        });
    });
});
*/