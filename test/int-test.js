const assert = require('assert');
const message = require('../utils');
const chai = require('chai');
const chaiHTTP = require('chai-http')

//const cfenv = require('cfenv');
//const appEnv = cfenv.getAppEnv();
const app = require('../app');
//const host = appEnv.url;
// const host = process.env['ROUTE'] || 'http://localhost:3000/route'
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
        chai.request(app)
        .get("/api/sensor")
        .end((err, response) => {
            response.should.have.status(200);
            done();
        });
    });
})
// npm run mocha test/int-test.js