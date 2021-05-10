

const db = require("../database/io");
const { currentDateTime } = require('../utils');

/**
 * A model that will handle all data about the humidity in
 * the room.
 */
class Humidity {

    /**
     * Simple constructor that sets the name of the database target
     */
    constructor() {
        this.humidityDbName = 'humidity';
    };

    /**
     * This function recieves data and calls the correct database
     * function with nessecary arguments
     * @param {The airquality data recieved from the hardware} data 
     */
    writeToDB({humidity}) {
        const data = {
            humidity
        };
        return db.writeToDB(this.humidityDbName, data, currentDateTime());
    };

    /**
     * This function takes a table and returns the latest entry.
     * @param { String } targetTable The table to read from.
     * @returns A promise including the latest data.
     */
    readLatestEntry() {
        return db.readLatestEntry(this.humidityDbName);
    };
}

// Exports to use elsewhere in the application
module.exports = { Humidity }