
// hämtning till data sker här
const db = require("../database/io");
const { currentDateTime } = require('../utils');

class Airquality {

    constructor() {
        this.airqualityDBName = 'airquality';
    }

    now() {
        return currentDateTime();
    }

    writeToDB(data) {
        db.writeToDB(data, this.airqualityDBName, now()).then(res => {
            return Promise.resolve(res);
        })
    }

    readLatestEntry() {
        db.readLatestEntry("test").then(res => {
            return res;
        })
    }
}

module.exports = { Airquality }