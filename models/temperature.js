
/**
 * @fileoverview This file holds the model for temperature, 
 * which has different database calling functions.
 * Dependencies are the cloudant instance (db) and 
 * a time and date function from utils.
 */

const db = require("../database/io");
const { ApplicationError } = require('../errors/applicationError');
const { currentDateTime } = require('../utils');

/**
 * A model that will handle all data about the temperature in
 * the room.
 */
class Temperature {

    /**
     * Constructor that sets the name of the database target table.
     */
    constructor() {
        /** @private @const {string} */
        this.temperatureDbName_ = 'temperature';
    };

    /**
     * This function recieves a data object and writes calls a write 
     * method in the database file.
     * @param { String } temperature the current temperature measured
     * in celsius.
     * @returns { Promise } Promise object that represents the result 
     * of the cloudant response of the write operation.
     */
    writeToDB({temperature}) {
        if (!temperature) { 
            throw new ApplicationError("400", "Invalid parameters");
        } 
        const data = {
            temperature
        };
        return db.writeToDB(this.temperatureDbName_, data, currentDateTime());
    };

    /**
     * This function calls the database file to read the latest document 
     * written to the temperature table.
     * @returns { Promise } Promise object that represents the latest 
     * document.
     */
    readLatestEntry() {
        return db.readLatestEntry(this.temperatureDbName_);
    };
}

// Exports to use elsewhere in the application
module.exports = { Temperature }