var db = require ("../database/pg_database");

// Set pool connection
var pool = db.connect();


var peopleObj = {};
  peopleObj.id = 'Y2lzY29zcGFyazovL3VzL1BFT1BMRS82YTJiNDJlMi0wMGZlLTRjMzItYjFiNS03ZGFmZjFlMDE3NDY2';
  peopleObj.emails = ["rubrette@cisco.com","rbrettes@cisco.com"];
  peopleObj.displayname = "Rui Brettes";
  peopleObj.avatar = "https://1efa7a94ed216783e352-c62266528714497a17239ececf39e9e2.ssl.cf1.rackcdn.com/V1~bc4c0369d93341f586946fcc7c156ee3~MeA2EKCgTWOa2lZbW7vHUw==~1600";
  peopleObj.created = "2012-06-15T20:27:18.364Z";
  peopleObj.authorization = "PLEASE UPDATE";

// Insert people
//db.insert_people(pool,peopleObj);

//Update user
 // db.update_people(pool,peopleObj);

// Delete people
// db.delete_people(pool,"Y2lzY29zcGFyazovL3VzL1BFT1BMRS82YTJiNDJlMi0wMGZlLTRjMzItYjFiNS03ZGFmZjFlMDE3NDY2")


//get
var result = db.get_actions (pool,"ORDER BY id ASC","");

console.log(result);
