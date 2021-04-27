/**
 * @fileoverview This file handles database calls. 
 * Dependencies are local modules such as utils.
 * @package
 */
const cloudant = require('./setup');
const db = cloudant.db;


/**
 * This function recieves data and a destination and manipulates 
 * the cloudant database.
 * @param { The data to be written } data 
 * @param { The path to the table to write to } dest 
 */
async function writeToDB(data, targetTable, id) {
  return await db.use(targetTable).insert(data, id);
}

/**
 * This async function searches for the entry that has the corresponding
 * id in the specified cloudant table. Returns all matching id's.
 * @param { The id to match with a specific entry } id 
 * @param { The name of the table to search from } table
 */
async function readFromDB(id, targetTable) {
  return await db.use(targetTable).get(id);
};

async function readLatestEntry(targetTable) {
    console.log(targetTable);
    return await db.use(targetTable).list({
        fields: ["_id", "date"],
        sort: [{"data": "desc"}],
        limit: 2
    });
}

// the functions to be used in the different route files
module.exports = { readFromDB, writeToDB, readLatestEntry }
