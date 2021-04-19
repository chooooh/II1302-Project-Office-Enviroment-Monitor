const assert = require('assert');
const message = require('../utils');
const chai = require('chai');
const chaiHTTP = require('chai-http')

var host = "http://localhost:6001";
//Assertion Style
chai.should();

chai.use(chaiHTTP);

describe('Hello', () => {
 it('Welcome Message', () => {
        assert.strictEqual(message.getWelcomeMessage(), "server starting on ");
    });
});

describe('Test GET /user', () => {
    it('It should return...', (done) => {
        chai.request(host)
        .get("/api/sensor")
        .end((err, response) => {
            response.should.have.status(200);
            done();
        })
    })
})