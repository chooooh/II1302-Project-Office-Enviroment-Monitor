
/**
 * @fileoverview This file holds the model for humidity, 
 * which has different database calling functions.
 * Dependencies are the cloudant instance (db) and 
 * a time and date function from utils.
 */

const db = require("../database/io");
const { ApplicationError } = require('../errors/applicationError');
const { currentDateTime } = require('../utils');

/**
 * A model that will handle all data about the humidity in
 * the room.
 */
class Humidity {

    /**
     * Constructor that sets the name of the database target table.
     */
    constructor() {
        /** @private @const {string} */
        this.humidityDbName_ = 'humidity';
    };

    /**
     * This function recieves a data object and writes calls a write method 
     * in the database file.
     * @param { String } humidity the humidity value measured
     * @returns { Promise } Promise object that represents the result of
     * the cloudant response of the write operation.
     */
    writeToDB({humidity}) {
        if (!humidity) {
            throw new ApplicationError("400", "Invalid parameters");
        } 
        const data = {
            humidity
        };
        return db.writeToDB(this.humidityDbName_, data, currentDateTime());
    };

    /**
     * This function calls the database file to read the latest document 
     * written to the humidity table.
     * @returns { Promise } Promise object that represents the latest 
     * document.
     */
    readLatestEntry() {
        return db.readLatestEntry(this.humidityDbName_);
    };
}

// Exports to use elsewhere in the application
module.exports = { Humidity }