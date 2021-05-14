

/**
 * @fileoverview This file holds the model for people, 
 * which has different database calling functions.
 * Dependencies are the cloudant instance (db) and 
 * a time and date function from utils.
 */
const db = require("../database/io");
const { ApplicationError } = require('../errors/applicationError');
const { currentDateTime } = require('../utils');

/**
 * A model that will handle all data about the amount of
 * people present in the room.
 */
class People {

    /**
     * Constructor that sets the name of the database target table.
     */
    constructor() {
        /** @private @const {string} */
        this.peopleDbName_ = 'people';
    };

    /**
     * This function recieves a data object and writes calls a write method 
     * in the database file.
     * @param { String } people +1 or -1, depending on if someone entered
     * or left the room.
     * @returns { Promise } Promise object that represents the result of
     * the cloudant response of the write operation.
     */
    writeToDB({people}) {
        if (!people) {
            return Promise.reject(new ApplicationError("400", "Invalid parameters"));
        } 
        const data = {
            people
        };
        return db.writeToDB(this.peopleDbName_, data, currentDateTime());
    };

    /**
     * This function calls the database file to read the latest document 
     * written to the people table.
     * @returns { Promise } Promise object that represents the latest 
     * document.
     */
    readLatestEntry() {
        return db.readLatestEntry(this.peopleDbName_);
    };
}

// Exports to use elsewhere in the application
module.exports = { People }