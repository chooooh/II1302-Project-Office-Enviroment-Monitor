/**
 * @fileoverview This file serves the routes for the sensor api.
 * Dependencies are Express, and the local module sensor, that is the
 * sensor model.
 * @package
 */
const express = require('express');
const router = express.Router();
var counter = 0;

const { read, write } = require('../../database/io');
//const sensor = require('../../models/sensor');

/**
 * Route serving the sensor data.
 * @param {string} path 
 */
router.get('/', (req, res) => {
    res.json({"data": ++counter});
});

// POST /api/sensor?data=52
router.post('/', (req, res) => {
    /*
    const data = req.parse('data')
    db.send(data)
    res.send(200);
    */
})

//api/sensor/test
router.get('/test', (req, res) => {
    const date = Date();
    write( {airquality: 45}, 'bob', date)
    res.set(200).send("hello");
})

router.get('/ch', (req, res) => {
    const result = read('rabbit', 'bob');
    console.log(result)
    res.set(200).send(result);
})

module.exports = router;