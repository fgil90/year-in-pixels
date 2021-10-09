var sqlite3 = require('sqlite3').verbose();

function initializeDB() {
    const db = new sqlite3.Database('data.db');
    db.serialize(function () {
        db.run("CREATE TABLE IF NOT EXISTS moods (year INTEGER, data BLOB)")
    });
    db.close();
}

initializeDB();

function parseStringToArray(string) {
    const array = JSON.parse("[" + string + "]");
    return array
}

exports.getYear = (year, callback) => {
    const db = new sqlite3.Database('data.db');
    db.get("SELECT * FROM moods WHERE year = ?", year, callback)
    db.close();
}

exports.getAllYears = (callback) => {
    const db = new sqlite3.Database('data.db');
    db.all("SELECT * FROM moods", callback)
    db.close();
}

exports.insertYear = (year, data) => {
    const db = new sqlite3.Database('data.db');
    db.run('INSERT INTO moods VALUES (?, ?)', year, data)
    db.close();
}


exports.updateYear = (year, data) => {
    const db = new sqlite3.Database('data.db');
    db.run("UPDATE moods SET data = ? WHERE year = ?", data, year)
    db.close()
}

exports.deleteYear = (year) => {
    const db = new sqlite3.Database('data.db');
    db.run("DELETE FROM moods WHERE year = ?", year)
    db.close()
}

// insertYear(2020, [1,2,3,1,3,1,2,3,1,3,2])

// getYear(2020, (err, row)=>{
//     if (err || row === undefined){
//         return undefined
//     }
//     console.log(row)
// });