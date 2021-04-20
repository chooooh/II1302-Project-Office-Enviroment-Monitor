const assert = require('assert');
const message = require('../utils');
const chai = require('chai');
const chaiHTTP = require('chai-http')
const cfenv = require('cfenv');
const appEnv = cfenv.getAppEnv();

const host = appEnv.url;
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
            console.log(host);
            console.log(err);
            response.should.have.status(200);
            done();
        });
    });
})