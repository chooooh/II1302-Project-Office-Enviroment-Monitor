
/**
 * @fileoverview This file serves the routes for the sensor api.
 * Dependencies are Express, and the models for our data.
 * A helper method from utils providing time and date is also
 * used.
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
const airQualityInstance = new AirQuality();
const TempInstance = new Temperature();
const HumidityInstance = new Humidity();
const PeopleInstance = new People();

/**
 * This endpoint allows the micro controller simultaneously send all latest
 * sensor data.
 * TODO
 *  - 339 vid undefined
 *  {"error":{"message":"repsonse is not defined","stack":"ReferenceError: repsonse is not defined\n 
    at C:\\Users\\choh-\\OneDrive\\Dokument\\Skolan\\II1302 Projekt och Projektmetoder\\project\\II1302-Project-
    Office-Enviroment-Monitor\\routes\\api\\sensor.js:45:27\n   
    at processTicksAndRejections (internal/process/task_queues.js:93:5)"}} 
 */
router.post('/', async (req, res, next) => {
    const {carbon, volatile, temperature, humidity} = req.query;
    const date = currentDateTime();
    try {
        const response = await Promise.all([
            await writeToDB('airquality', {carbon, volatile}, date),
            await writeToDB('temperature', {temperature}, date),
            await writeToDB('humidity', {humidity}, date)
        ]);
        //POST /api/sensor?carbon=10&volatile=20&temperature=30&humidity=40 HTTP/1.1
        res.set(200).send(response);
    } catch (err) {
        next(err);
    }
});

/**
 * This is the endpoint that provides information of the current latest 
 * noted airquality. Response will contain a json object of the requested
 * data.
 */
router.get('/airquality', async (req, res, next) => {
    const result = await airQualityInstance.readLatestEntry()
    .catch((error) => {
        //korrekt error?
        error.statusCode = 400;
        next(error);
    })
    return res.status(200).json(result);
});

/**
 * This is the endpoint that the micro controller will send
 * HTTP POST requests to with information about the current
 * air quality in a room. It will in its turn call a method
 * that writes the data to the cloudant database.
 */
router.post('/airquality', async (req, res, next) => {
    const result = await airQualityInstance.writeToDB(req.query)
    .catch((error) => {
        //korrekt error?
        error.statusCode = 400;
        next(error);
    });
    return res.status(200).json(result);
});

/**
 * This is the endpoint that provides information of the current latest 
 * registered temperature. Response will contain a json object of the
 * requested data.
 */
 router.get('/temperature', async (req, res, next) => {
    const response = await TempInstance.readLatestEntry()
    .catch(error => {
        //korrekt error?
        error.statusCode = 400;
        next(error);
    })
    return res.status(200).json(response);
});

/**
 * This is the endpoint that the micro controller will send
 * HTTP POST requests to with information about the current
 * temperature in a room. It will in its turn call the
 * temperature model for further processing.
 */
 router.post('/temperature', async (req, res, next) => {
    const response = await TempInstance.writeToDB(req.query)
    .catch(error => {
        //korrekt error?
        error.statusCode = 400;
        next(error);
    })
    return res.status(200).json(response);
});

/**
 * This is the endpoint that provides information of the current latest 
 * registered humidity. Response will contain a json object of the
 * requested data.
 */
 router.get('/humidity', async (req, res, next) => {
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
 router.post('/humidity', async (req, res, next) => {
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
 router.get('/people', async (req, res, next) => {
    const result = await PeopleInstance.readLatestEntry()
    .catch(error => {
        res.statusCode = 400;
        next(error);
    })
    return res.status(200).json(result);
});

/**
 * This is the endpoint that the micro controller will send
 * HTTP POST requests to with information about the current
 * amount of people in a room. It will in its turn call the
 * people model for further processing.
 */
 router.post('/people', async (req, res, next) => {
    const result = await PeopleInstance.writeToDB(req.query)
    .catch(error => {
        res.statusCode = 400;
        next(error);
    })
    return res.status(200).json(result);
});


// Exports to use elsewhere in the application
module.exports = router;