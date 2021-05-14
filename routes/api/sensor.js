
/**
 * @fileoverview This file serves the routes for the sensor api.
 * Dependencies are Express, and the models for our data.
 * A helper method from utils providing time and date is also
 * used.
 * @package
 */
const express = require('express');
const router = express.Router();
const { currentDateTime, parseRes } = require('../../utils');

//Classes
const { AirQuality } = require('../../models/airquality');
const { Temperature } = require('../../models/temperature');
const { Humidity } = require('../../models/humidity');
const { People } = require('../../models/people');
const { Gases } = require('../../models/gases');
const { writeToDB } = require('../../database/io');

//Class instances
const AirQualityInstance = new AirQuality();
const TempInstance = new Temperature();
const HumidityInstance = new Humidity();
const GasesInstance = new Gases();
const PeopleInstance = new People();

/* ---------------------- ROUTE FOR POST ALL DATA ---------------------- */

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
    const result = await Promise.all([
        await AirQualityInstance.writeToDB('airquality', {carbon, volatile}, date),
        await TempInstance.writeToDB('temperature', {temperature}, date),
        await HumidityInstance.writeToDB('humidity', {humidity}, date)
    ]).catch(error => {
        next(error);
    });
        //POST /api/sensor?carbon=10&volatile=20&temperature=30&humidity=40 HTTP/1.1
    res.set(200).json(result);
});

/* ---------------------- GASES ---------------------- */

router.get('/gases', async (req, res, next) => {
    const response = await GasesInstance.readLatestEntry()
    .catch((error) => {
        next(error);
    })
    return res.status(200).json(parseRes(response));
});

router.post('/gases', async (req, res, next) => {
    const response = await GasesInstance.writeToDB(req.query)
    .catch((error) => {
        next(error);
    });
    return res.status(200).json(response);
});

/* ---------------------- TEMPERATURE ---------------------- */

/**
 * This is the endpoint that provides information of the current latest 
 * registered temperature. Response will contain a json object of the
 * requested data.
 */
 router.get('/temperature', async (req, res, next) => {
    const response = await TempInstance.readLatestEntry()
    .catch(error => {
        next(error);
    })
    return res.status(200).json(parseRes(response));
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
        next(error);
    })
    return res.status(200).json(response);
});

/* ---------------------- HUMIDITY ---------------------- */

/**
 * This is the endpoint that provides information of the current latest 
 * registered humidity. Response will contain a json object of the
 * requested data.
 */
 router.get('/humidity', async (req, res, next) => {
    const response = await HumidityInstance.readLatestEntry()
    .catch(error => {
        next(error);
    })
    return res.status(200).json(parseRes(response));
});

/**
 * This is the endpoint that the micro controller will send
 * HTTP POST requests to with information about the current
 * humidity in a room. It will in its turn call the
 * humidity model for further processing.
 */
 router.post('/humidity', async (req, res, next) => {
    const response = await HumidityInstance.writeToDB(req.query)
    .catch(error => {
        next(error);
    });
    return res.status(200).json(response);
});

/* ---------------------- PEOPLE ---------------------- */

/**
 * This is the endpoint that provides information of the current latest 
 * registered people in the room. Response will contain a json object 
 * of the requested data.
 */
 router.get('/people', async (req, res, next) => {
    const response = await PeopleInstance.readLatestEntry()
    .catch(error => {
        next(error);
    });
    return res.status(200).json(parseRes(response));
});

/**
 * This is the endpoint that the micro controller will send
 * HTTP POST requests to with information about the current
 * amount of people in a room. It will in its turn call the
 * people model for further processing.
 */
 router.post('/people', async (req, res, next) => {
    const response = await PeopleInstance.writeToDB(req.query)
    .catch(error => {
        next(error);
    });
    return res.status(200).json(response);
});

// Exports to use elsewhere in the application
module.exports = router;