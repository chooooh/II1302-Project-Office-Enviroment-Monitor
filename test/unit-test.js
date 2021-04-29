const { doesNotMatch } = require('assert');
const assert = require('assert');
const chai = require('chai');
chai.should();

const { getWelcomeMessage, currentDateTime } = require('../utils');
describe('Test utils', () => {
    it('Welcome Message', () => {
        const message = getWelcomeMessage();
        message.should.equal('server starting on ');
    });
/*
    it('Current date test, check if correct format', () => {
        const date = currentDateTime();
        date.should.have.lengthOf(19);
    })
    */
});