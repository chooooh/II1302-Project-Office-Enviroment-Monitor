/**
 * @fileoverview This file handles database calls. 
 * Dependencies are local modules such as utils.
 * @package
 */

const cloudant = require('./setup');
const db = cloudant.db;

/**
 * This function recieves data and a destination and writes it 
 * the cloudant database.
 * @param { The data to be written } data 
 * @param { The path to the table to write to } dest 
 */
async function writeToDB(targetTable, data, id) {
    return await db.use(targetTable).insert(data, id);
}

/**
 * This function takes a table and returns the latest entry.
 * @param { String } targetTable The table to read from
 * @returns A promise including the latest data
 */
async function readLatestEntry(targetTable) {
    const latestEntryQuery = {
        "selector": {
           "_id": {
              "$gt": "0"
           }
        },
        "fields": [
           "_id",
           "_rev",
           "data"
        ],
        "sort": [
           {
              "_id": "desc"
           }
        ],
        "limit":1
    };
    return await db.use(targetTable).find(latestEntryQuery);
};

/**
 * This async function searches for the entry that has the corresponding
 * id in the specified cloudant table. Returns all matching id's.
 * @param { The id to match with a specific entry } id 
 * @param { The name of the table to search from } table
 */
async function readFromDB(id, targetTable) { //to read multiple entries
  return await db.use(targetTable).get(id);
};

// Exports to use elsewhere in the application
module.exports = { readFromDB, writeToDB, readLatestEntry }
