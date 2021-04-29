/**
 * @fileoverview This file serves the routes for the sensor api.
 * Dependencies are Express, and the local module sensor, that is the
 * sensor model. A helper method providing time and date is also present.
 * @package
 */
require('dotenv').config();
const express = require('express');
const router = express.Router();
const cfenv = require('cfenv');
const appEnv = cfenv.getAppEnv();
const { AirQuality } = require('../../models/airquality');
const AQInstance = new AirQuality();

//const { readLatestEntry, readFromDB, writeToDB } = require('../../database/io');

var counter = 0;
const airqualityDbName = 'airquality';
const peopleDbName= 'people';

/**
 * random example
 */
router.get('/', (req, res) => {
    res.status(200).json({"data": ++counter});
});

/**
 * This is the endpoint that provides information of the current latest 
 * noted airquality. Response will contain a json object of the requested
 * data.
 */
router.get('/airquality', (req, res) => {
    AQInstance.readLatestEntry()
    .then(result => {
        res.set(200).send(result);
    }).catch(err => {
        console.log(err);
        res.set(400).send(err);
    });
});

/**
 * This is the endpoint that the micro controller will send
 * HTTP POST requests to with information about the current
 * air quality in a room. It will in its turn call a method
 * that writes the data to the cloudant database.
 */
router.post('/airquality', (req, res) => {
    AQInstance.writeToDB(req.query)
    .then(result => {
        res.set(200).send(result)
    }).catch(err => {
        console.log(err)
        res.set(400).send(err);
    });
});

/**
 * This is the endpoint that the micro controller will send
 * HTTP POST requests to with information about how many people
 * that currently are in the room. It will in its turn call
 * a method that writes the data to the cloudant database.
 router.post('/peopleintheroom', (req, res) => {
     const now = currentDateTime();
     writeToDB(req.query, peopleDbName, now)
     .then(result => {
         res.set(200).send(result)
        }).catch(err => {
            console.log(err)
            res.set(400).send(err);
        });
    });
    */

/*
 router.get('/peopleintheroom', (req, res) => {
    const host = appEnv.url;
    res.set(200).send(host);
});
*/


// Exports to use elsewhere in the application
module.exports = router;