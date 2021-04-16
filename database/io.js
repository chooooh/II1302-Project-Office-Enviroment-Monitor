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
 * This function recieves data and a destination and manipulates the database
 * @param { The data to be written } data 
 * @param { The path to the table to write to } dest 
 */
const write = (data, targetTable, id) => {
    db.use(targetTable).insert({data}, id, (err, res) => {
        console.log(res);

    });
    db.use(targetTable).index((err, res) => {
        console.log('Database has %d indexes', res.indexes.length);
    });
}


const read = (id, targetTable) => {
  db.use(targetTable).get(id, (err, res) => {
    return res;
  })
};

module.exports = {read, write}

/*
cloudant.db.create('bob').then(() => {
    cloudant.use('bob').insert({ happy: true }, 'rabbit').then((data) => {
      console.log(data); // { ok: true, id: 'rabbit', ...
    });
  }).catch((err) => {
    console.log(err);
});
*/