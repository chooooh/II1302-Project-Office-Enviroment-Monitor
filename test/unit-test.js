const assert = require('assert');
const message = require('../utils');
describe('Messages Test', () => {
 it('Welcomeeee Message', () => {
        assert.strictEqual(message.getWelcomeMessage(), "server starting on ");
    });
  it('Something else', () => {
      assert.strictEqual(1,1)
  } )
});