
/**
 * @fileoverview This file handles database calls. 
 * Dependencies are local modules such as utils.
 */

const cloudant = require('./setup');
const db = cloudant.db;

/**
 * This function recieves data and a destination and writes it 
 * the cloudant database.
 * @param { string } targetTable 
 * @param { Object } data 
 * @returns { Promise } Promise object that represents the result of the database call.
 */
async function writeToDB(targetTable, data, date) {
   return await db.use(targetTable).insert({data, date}, `${targetTable}:${date}`);
}

/**
 * This function takes a table and returns the latest entry.
 * @param { String } targetTable The table to read from.
 * @returns { Promise } Promise containing the latest data.
 */
async function readLatestEntry(targetTable) {
   console.log("Read latest entry")
   const latestEntryQuery = {
      "selector": {
         "_id": {
            "$gt": "0"
         }
      },
      "fields": [
         "_id",
         "_rev",
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
   return await db.use(targetTable).find(latestEntryQuery);
};

/**
 * This async function searches for the entry that has the corresponding
 * id in the specified cloudant table. Returns all matching id.
 * @param { string } targetTable Name of the Cloudant datbase table to read from.
 * @param { string } id The document with corresponding id to read.
 * @returns { Promise } Promise object that represents the result of
 * the cloudant response of the write operation
 */
async function readFromDB(targetTable, id) {
  return await db.use(targetTable).get(id);
};

// Exports to use elsewhere in the application
module.exports = { readFromDB, writeToDB, readLatestEntry }
