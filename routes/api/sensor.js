/**
 * @fileoverview This file serves the routes for the sensor api.
 * Dependencies are Express, and the local module sensor, that is the
 * sensor model. A helper method providing time and date is also present.
 * @package
 */
require('dotenv').config()
const { DateTime } = require("luxon");
const express = require('express');
const router = express.Router();
const cfenv = require('cfenv');
const appEnv = cfenv.getAppEnv();

const { readFromDB, writeToDB } = require('../../database/io');
//const sensor = require('../../models/sensor');

var counter = 0;
const airqualityDbName = 'airquality';
const peopleDbName= 'people';

/**
 * Route serving the sensor data.
 * @param {string} path 
 */
router.get('/', (req, res) => {
    res.status(200).json({"data": ++counter});
});

router.get('/airquality', (req, res) => {
    readFromDB("2021-4-20 16:12:14", airqualityDbName)
    .then(result => {
        res.set(200).send(result);
    })
});

/**
 * This is the endpoint that the micro controller will send
 * HTTP POST requests to with information about the current
 * air quality in a room. It will in its turn call a method
 * that writes the data to the cloudant database.
 */
router.post('/airquality', (req, res) => {
    const now = currentDateTime();
    writeToDB(req.query, airqualityDbName, now)
    .then(result => {
        res.set(200).send(result)
    }).catch(err => {
        console.log(err)
        res.set(400).send(err);
    });
});

/**
 * This is the endpoint that provides information of the current airquality.
 */
router.get('/airquality', (req, res) => {
    const host = appEnv.url;
    res.set(200).send(host);
});

/**
 * This is the endpoint that the micro controller will send
 * HTTP POST requests to with information about how many people
 * that currently are in the room. It will in its turn call
 * a method that writes the data to the cloudant database.
 */
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

/**
 * This is the endpoint that provides information of the current airquality.
 */
 router.get('/peopleintheroom', (req, res) => {
    const host = appEnv.url;
    res.set(200).send(host);
});

/**
 * A simple function that returns the current date and time
 * @returns Date and time with custom formatting
 */
const currentDateTime = () => {
    let now = DateTime.local();
    return now.year + "-" + now.month + "-" + now.day + " " + now.hour + ":" + now.minute + ":" + now.second
}

// Exported functions references to use elsewhere
module.exports = router;