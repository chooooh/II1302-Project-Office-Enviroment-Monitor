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
const cfenv = require('cfenv');
// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
/*
const cloudant = require('./database/setup');
const db = cloudant.db.use('bob');
db.index((err, res) => {
    console.log('Database has %d indexes', res.indexes.length);
});
db.find({ selector: { }}, (err, res) => {
    console.log("find result:", res.docs);
    res.docs.forEach(doc => {
        console.log(doc);
    })
});

var ddoc = {
    name: 'something',
    value: '5'
  };
db.insert(ddoc, function(err, result){})
*/

// create a new express server
const app = express();
//Use all routes in sensor file 
app.use('/api/sensor', sensor);

// serve the files out of ./public as our main files
app.use(express.static(`${__dirname}/client/build`));

// get the app environment from Cloud Foundry
const appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function () {
    // print a message when the server starts listening
    console.log(message.getWelcomeMessage() + appEnv.url);
});
