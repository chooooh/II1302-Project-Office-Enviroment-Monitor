
const db = require("../database/io");
const { currentDateTime } = require('../utils');

/**
 * A model that will handle all data about the temperature in
 * the room.
 */
class Temperature {

    /**
     * Simple constructor that sets the name of the database target
     */
    constructor() {
        this.temperatureDbName = 'temperature';
    };

    /**
     * This function recieves data and calls the correct database
     * function with nessecary arguments
     * @param {The airquality data recieved from the hardware} data 
     */
    writeToDB({temperature}) {
        const data = {
            temperature
        };
        return db.writeToDB(this.temperatureDbName, data, currentDateTime());
    };

    /**
     * This function takes a table and returns the latest entry.
     * @param { String } targetTable The table to read from.
     * @returns A promise including the latest data.
     */
    readLatestEntry() {
        return db.readLatestEntry(this.temperatureDbName);
    };
}

// Exports to use elsewhere in the application
module.exports = { Temperature }