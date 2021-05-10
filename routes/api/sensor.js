/**
 * @fileoverview This file serves the routes for the sensor api.
 * Dependencies are Express, and the local module sensor, that is the
 * sensor model. A helper method providing time and date is also present.
 * @package
 */
const express = require('express');
const router = express.Router();
const { currentDateTime } = require('../../utils');

//Classes
const { AirQuality } = require('../../models/airquality');
const { Temperature } = require('../../models/temperature');
const { Humidity } = require('../../models/humidity');
const { People } = require('../../models/people');
const { writeToDB } = require('../../database/io');

//Class instances
const AQInstance = new AirQuality();
const TempInstance = new Temperature();
const HumidityInstance = new Humidity();
const PeopleInstance = new People();


var counter = 0;

/**
 * random example
 */
router.get('/', (req, res) => {
    res.status(200).json({"data": ++counter});
});

router.post('/', async (req, res) => {
    const {carbon, volatile, temperature, humidity} = req.query;
    const date = currentDateTime();
    try {
        const resA = await writeToDB('airquality', {carbon, volatile}, date)
        const resT = await writeToDB('temperature', {temperature}, date);
        const resH = await writeToDB('humidity', {humidity}, date);
        res.set(200).send({resA, resT, resH});
    } catch (err) {
        next(err);
    }
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
        res.set(200).send(result);
    }).catch(err => {
        res.set(400).send(err);
    });
});

/**
 * This is the endpoint that provides information of the current latest 
 * registered temperature. Response will contain a json object of the
 * requested data.
 */
 router.get('/temperature', (req, res) => {
    TempInstance.readLatestEntry()
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
 * temperature in a room. It will in its turn call the
 * temperature model for further processing.
 */
 router.post('/temperature', (req, res) => {
    TempInstance.writeToDB(req.query)
    .then(result => {
        res.set(200).send(result);
    }).catch(err => {
        res.set(400).send(err);
    });
});

/**
 * This is the endpoint that provides information of the current latest 
 * registered humidity. Response will contain a json object of the
 * requested data.
 */
 router.get('/humidity', (req, res) => {
    HumidityInstance.readLatestEntry()
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
 * humidity in a room. It will in its turn call the
 * humidity model for further processing.
 */
 router.post('/humidity', (req, res) => {
    HumidityInstance.writeToDB(req.query)
    .then(result => {
        res.set(200).send(result);
    }).catch(err => {
        res.set(400).send(err);
    });
});

/**
 * This is the endpoint that provides information of the current latest 
 * registered people in the room. Response will contain a json object 
 * of the requested data.
 */
 router.get('/people', (req, res) => {
    PeopleInstance.readLatestEntry()
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
 * amount of people in a room. It will in its turn call the
 * people model for further processing.
 */
 router.post('/people', (req, res) => {
    PeopleInstance.writeToDB(req.query)
    .then(result => {
        res.set(200).send(result);
    }).catch(err => {
        res.set(400).send(err);
    });
});


// Exports to use elsewhere in the application
module.exports = router;