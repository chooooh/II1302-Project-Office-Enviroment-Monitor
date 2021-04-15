/**
 * @fileoverview This file serves the routes for the sensor api.
 * Dependencies are Express, and the local module sensor, that is the
 * sensor model.
 * @package
 */
const express = require('express');
const router = express.Router();
var counter = 0;
//const sensor = require('../../models/sensor');

/**
 * Route serving the sensor data.
 * @param {string} path 
 */
router.get('/', (req, res) => {
    res.json({"data": ++counter});
});

module.exports = router;