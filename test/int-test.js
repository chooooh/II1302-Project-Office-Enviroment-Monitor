
const assert = require('assert');
const message = require('../utils');
const chai = require('chai');
const chaiHTTP = require('chai-http')
const app = require('../app');

const { readFromDB, writeToDB } = require('../database/io.js')

// const cfenv = require('cfenv');
// const appEnv = cfenv.getAppEnv();
// const host = appEnv.url;
// const host = process.env['ROUTE'] || 'http://localhost:3000/route'
//Assertion Style
chai.should();

chai.use(chaiHTTP);

/**
 * Integration test to make sure that the GET /user route
 * is reachable.
 */
describe('Test GET /user', () => {
    it('It should return status code 200', (done) => {
        chai.request(app)
        .get("/api/sensor")
        .end((err, response) => {
            response.should.have.status(200);
            done();
        });
    });
});

/**
 * Integration test to make sure that route for POST 
 * /api/sensor/airquality is reachable.
 */
describe('Test POST data to /api/sensor/airquality', () => {
    it('It should return status code 200', (done) => {
        chai.request(app)
        .get("/api/sensor/airquality")
        .end((err, response) => {
            response.should.have.status(200);
            done();
        });
    });
});

/**
 * Integration test to make sure that route for POST 
 * /api/sensor/airquality is reachable. 
 */
describe('Test POST data to /api/sensor/peopleintheroom', () => {
    it('It should return status code 200', (done) => {
        chai.request(app)
        .get("/api/sensor/peopleintheroom")
        .end((err, response) => {
            response.should.have.status(200);
            done();
        });
    });
});

describe('Write data to correct cloudant table', () => {
    it('It should contain the entry {_id: testing}', (done) => {

    })
})