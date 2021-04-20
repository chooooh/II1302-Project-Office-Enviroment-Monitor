const cloudant = require('./setup');
const db = cloudant.db;
/*
db.index((err, res) => {
    console.log('Database has %d indexes', res.indexes.length);
});
/*
db.find({ selector: { date: 2019-02-34}}, (err, res) => {
    console.log("find result:", res.docs);
    res.docs.forEach(doc => {
        console.log(doc);
    })
});
*/

/**
 * This function recieves data and a destination and manipulates 
 * the database.
 * @param { The data to be written } data 
 * @param { The path to the table to write to } dest 
 */
async function writeToDB(data, targetTable, id) {
  return await db.use(targetTable).insert(data, id);
}
/*
const writeToDB = (data, targetTable, id) => {
    db.use(targetTable).insert({data}, id, (err, res) => {
        console.log(res);

    });
    db.use(targetTable).index((err, res) => {
        console.log('Database has %d indexes', res.indexes.length);
    });
}
*/

/**
 * This function searches for the entry that has the corresponding
 * id in the specified cloudant table 
 * @param { The id to match with a specific entry} id 
 * @param { The name of the table to search from} table
 */
const readFromDB = (id, targetTable) => {
  db.use(targetTable).get(id, (err, res) => {
    console.log(JSON.stringify(res) + "from io.js")
    return res;
  })
};

/**
 * This async function searches for the entry that has the corresponding
 * id in the specified cloudant table 
 * @param { The id to match with a specific entry} id 
 * @param { The name of the table to search from} table
 */
async function readFromDB2(id, targetTable) {
  return await db.use(targetTable).get(id);
};

// the functions to be used in the different route files
module.exports = { readFromDB, writeToDB, readFromDB2 }
