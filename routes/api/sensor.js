/**
 * @fileoverview This file serves the routes for the sensor api.
 * Dependencies are Express, and the local module sensor, that is the
 * sensor model. A helper method providing time and date is also present.
 * @package
 */
const { DateTime } = require("luxon");
const express = require('express');
const router = express.Router();

const { readFromDB, readFromDB2, writeToDB } = require('../../database/io');
//const sensor = require('../../models/sensor');

var counter = 0;
const airqualityDbName = 'airquality';
const peopleDbName= 'people';


/**
 * Route serving the sensor data.
 * @param {string} path 
 */
router.get('/', (req, res) => {
    res.json({"data": ++counter});
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
    }).catch(err => console.log(err));
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
    }).catch(err => console.log(err));
});

/**
 * A simple function that 
 * @returns 
 */
const currentDateTime = () => {
    let now = DateTime.local();
    return now.year + "-" + now.month + "-" + now.day + " " + now.hour + ":" + now.minute + ":" + now.second
}

module.exports = router;