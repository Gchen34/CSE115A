const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/users.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Connected to the user database.');
  closeDB();
});

/*
function makeDB() {
  return new sqlite3.Database('./db/users.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.log(err);
    }
    console.log('Created new user.db');
  });
}
*/
function closeDB() {
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });
}