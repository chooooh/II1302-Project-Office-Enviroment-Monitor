
// hämtning till data sker här
const db = require("../database/io");
const { currentDateTime } = require('../utils');

class AirQuality {

    constructor() {
        this.airqualityDBName = 'airquality';
    };

    /**
     * Helper function to create "unique" id's for database entries.
     * @returns Custom formatted string with time and date.
     */
    currentDateTime() {
        return currentDateTime();
    };

    /**
     * This function recieves data and calls the correct database
     * function with nessecary arguments
     * @param {The airquality data recieved from the hardware} data 
     */
    writeToDB(data) {
        return db.writeToDB(this.airqualityDBName, data, currentDateTime());
    };

    /**
     * This function takes a table and returns the latest entry.
     * @param { String } targetTable The table to read from.
     * @returns A promise including the latest data.
     */
    readLatestEntry() {
        return db.readLatestEntry(this.airqualityDBName);
    };
}

// Exports to use elsewhere in the application
module.exports = { AirQuality }