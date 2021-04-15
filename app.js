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
require('dotenv').config()
const cfenv = require('cfenv');
// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv

// create a new express server
const app = express();
//Use all routes in sensor file 
app.use('/api/sensor', sensor);


// serve the files out of ./public as our main files
app.use(express.static(`${__dirname}/client/build`));

// get the app environment from Cloud Foundry
const appEnv = cfenv.getAppEnv();

// Cloudant (database)
// Load the Cloudant library.

const Cloudant = require('@cloudant/cloudant');
// Get account details from environment variables

const url = process.env.cloudant_url;
const username = process.env.cloudant_username;
const password = process.env.cloudant_password;
// Initialize the library with url and credentials.
/*
const cloudant = Cloudant({ url: url, username: username, password: password });

cloudant.db.create('bob').then(() => {
    cloudant.use('bob').insert({ happy: true }, 'rabbit').then((data) => {
      console.log(data); // { ok: true, id: 'rabbit', ...
    });
  }).catch((err) => {
    console.log(err);
});
*/
// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function () {
    // print a message when the server starts listening
    console.log(message.getWelcomeMessage() + appEnv.url);
});
