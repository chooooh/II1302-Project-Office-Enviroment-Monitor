/*eslint-env node*/
/**
 * @fileoverview This file is the server. It is also designated as starting point
 * for IBM Cloud.
 * Dependencies are Express, cfenv (IBM Cloud), and local modules such as utils
 * and the route api/sensor
 * @package
 */

const express = require('express');
const message = require('./utils');
const sensor = require('./routes/api/sensor');
const cfenv = require('cfenv');

// create a new express server
const app = express();


//Use all routes in sensor file 
app.use('/api/sensor', sensor);

// serve the files out of ./public as our main files
app.use(express.static(`${__dirname}/client/build`));

app.use((error, req, res, next) => {
    if (!error.statusCode) error.statusCode = 500;

    return res.status(error.statusCode).json({
        name: error.name,
        message: error.message,
        stack: error.stack,

    });
});

// get the app environment from Cloud Foundry
const appEnv = cfenv.getAppEnv();


// start server on the specified port and binding host
if (!module.parent) {
    app.listen(appEnv.port, '0.0.0.0', function () {
        // print a message when the server starts listening
        console.log(message.getWelcomeMessage() + appEnv.url);
    })
}
module.exports = app;