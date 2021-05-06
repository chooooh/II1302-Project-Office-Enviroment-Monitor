/**
 * @fileoverview This file serves the routes for the sensor api.
 * Dependencies are Express, and the local module sensor, that is the
 * sensor model. A helper method providing time and date is also present.
 * @package
 */
const express = require('express');
const router = express.Router();
const { AirQuality } = require('../../models/airquality');
const AQInstance = new AirQuality();

router.get('/', (req, res) => {
    res.status(200).send("all data?");
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
        next(err);
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
        res.set(200).send(result);
    }).catch(err => {
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

// Exports to use elsewhere in the application
module.exports = router;