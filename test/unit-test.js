/**
 * @fileoverview This module contains unit tests. 
 * Dependecies are chai, and tested modules.
 */

// Testing framework
const chai = require('chai');
const { getWelcomeMessage, currentDateTime } = require('../utils');

// Uses the "should" interface
chai.should();

describe('Test utils', () => {
    it('Welcome Message', () => {
        const message = getWelcomeMessage();
        message.should.equal('server starting on ');
    });

    it('Current date test, check if correct format', () => {
        const date = currentDateTime();
        date.should.have.lengthOf(19);
    })
});