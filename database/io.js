
/**
 * @fileoverview This file handles database calls. 
 * Dependencies are local modules such as utils.
 */

const cloudant = require('./setup');
const db = cloudant.db;

/**
 * This function recieves data and a destination and writes it 
 * the cloudant database.
 * @param { String } targetDB 
 * @param { Object } data 
 * @returns { Promise } Promise object that represents the result of the database call.
 */
async function writeToDB(targetDB, data, date) {
   return await db.use(targetDB).insert({data, date}, `${targetDB}:${date}`);
}

/**
 * This function takes a table and returns the latest entry.
 * @param { String } targetDB The table to read from.
 * @returns { Promise } Promise containing the latest data.
 */
async function readLatestEntry(targetDB) {
   const latestEntryQuery = {
      "selector": {
         "_id": {
            "$gt": "0"
         }
      },
      "fields": [
         "data",
         "date"
      ],
      "sort": [
         {
            "_id": "desc"
         }
      ],
      "limit":1
   };
   return await db.use(targetDB).find(latestEntryQuery);
};

/**
 * This async function searches for the entry that has the corresponding
 * id in the specified cloudant table. Returns all matching id.
 * @param { String } targetDB Name of the Cloudant datbase table to read from.
 * @param { String } id The document with corresponding id to read.
 * @returns { Promise } Promise object that represents the result of
 * the cloudant response of the write operation
 */
async function readFromDB(targetDB, id) {
  return await db.use(targetDB).get(id);
};

// Exports to use elsewhere in the application
module.exports = { readFromDB, writeToDB, readLatestEntry }
