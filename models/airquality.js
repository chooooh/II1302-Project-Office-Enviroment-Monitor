
// hämtning till data sker här
const db = require("../database/io");
const { currentDateTime } = require('../utils');

class AirQuality {

    constructor() {
        this.airqualityDBName = 'airquality';
    };

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
    readLatestEntry(targetTable) {
        return db.readLatestEntry(this.airqualityDBName);
    };
}

module.exports = { AirQuality }