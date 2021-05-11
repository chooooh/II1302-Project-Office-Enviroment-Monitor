/**
 * @fileoverview This file holds the model for airquality, 
 * which has different database calling functions.
 * Dependencies are the cloudant instance (db) and 
 * a time and date function from utils.
 */
const db = require("../database/io");
const { currentDateTime } = require('../utils');

/**
 * A model class that calls database methods.
 */
class AirQuality {

    /**
     * Constructor that sets the name of the database target table.
     */
    constructor() {
        /** @private @const {string} */
        this.airqualityDBName_ = 'airquality';
    };

    /**
     * This function recieves a data object and writes calls a write method 
     * in the database file.
     * @param { String } carbon current carbon value measured in ppm
     * @param { String } volatile current amount of volatile gases in the room measured in ppb
     * @returns { Promise } Promise object that represents the result of
     * the cloudant response of the write operation.
     */
    writeToDB({carbon, volatile}) {
        const data = {
            carbon,
            volatile
        };
        return db.writeToDB(this.airqualityDBName_, data, currentDateTime());
    };

    /**
     * This function calls the database file to read the latest document 
     * written to the airquality table.
     * @returns { Promise } Promise object that represents the latest 
     * document.
     */
    readLatestEntry() {
        return db.readLatestEntry(this.airqualityDBName_);
    };
}

// Exports to use elsewhere in the application
module.exports = { AirQuality }