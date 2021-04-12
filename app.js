/*eslint-env node*/
/**
 * @fileoverview This file is the server. It is also designated as starting point
 * for IBM Cloud.
 * Dependencies are Express, cfenv (IBM Cloud), and local modules such as utils.
 * @package
 */

const express = require('express');
const message = require('./utils');
const sensor = require('./routes/api/sensor');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
const cfenv = require('cfenv');

// create a new express server
const app = express();
app.use('/api/sensor', sensor);

// serve the files out of ./public as our main files
app.use(express.static(`${__dirname}/client/build`));
// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {

	// print a message when the server starts listening
  console.log(message.getWelcomeMessage() + appEnv.url);
});
