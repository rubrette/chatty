
const low = require('lowdb');
const fileAsync = require('lowdb/lib/file-async');

const dbutils = require ("./database/database_utils.js");

const peopleDB = low('./database/people.json', {
  storage: fileAsync
})

peopleDB.defaults({ people: [] })
   .value()

var check_existing_user = dbutils.db_hasID(peopleDB,'people',"Y2lzY29zcGFyazovL3VzL1BFT1BMRS82YTJiNDJlMi0wMGZlLTRjMzItYjFiNS03ZGFmZjFlMDE3NDY")

if (!check_existing_user){
  // Push user to Database
  peopleDB.get('people')
    .push({ id: "Y2lzY29zcGFyazovL3VzL1BFT1BMRS82YTJiNDJlMi0wMGZlLTRjMzItYjFiNS03ZGFmZjFlMDE3NDY",
            displayname: 'Rui Brettes',
            emails: ["rubrette@cisco.com"],
            avatar: "https://1efa7a94ed216783e352-c62266528714497a17239ececf39e9e2.ssl.cf1.rackcdn.com/V1~bc4c0369d93341f586946fcc7c156ee3~MeA2EKCgTWOa2lZbW7vHUw==~1600",
            created: "2012-06-15T20:27:18.364Z",
            authorization: ""
          })
    .value()
} else {
  // // remove user
  // peopleDB.get('people')
  //   .remove({ id : "Y2lzY29zcGFyazovL3VzL1BFT1BMRS82YTJiNDJlMi0wMGZlLTRjMzItYjFiNS03ZGFmZjFlMDE3NDY" })
  //   .value();
  // // set all user content
  // peopleDB.get('people')
  //   .push({ id: "Y2lzY29zcGFyazovL3VzL1BFT1BMRS82YTJiNDJlMi0wMGZlLTRjMzItYjFiNS03ZGFmZjFlMDE3NDY",
  //           displayname: 'Rui Brettes',
  //           emails: ["rubrette@cisco.com"],
  //           avatar: "https://1efa7a94ed216783e352-c62266528714497a17239ececf39e9e2.ssl.cf1.rackcdn.com/V1~bc4c0369d93341f586946fcc7c156ee3~MeA2EKCgTWOa2lZbW7vHUw==~1600",
  //           created: "2012-06-15T20:27:18.364Z",
  //           authorization: ""
  //         })
  //   .value()
};

// update user authorization token
dbutils.updateUser_authorization(peopleDB, //Database
                            'people', //Table
                            "Y2lzY29zcGFyazovL3VzL1BFT1BMRS82YTJiNDJlMi0wMGZlLTRjMzItYjFiNS03ZGFmZjFlMDE3NDY", //ID
                            "OWQ0YzdlYjUtMzY1ZS00NjZmLTgyN2YtZjQ2NzgxYTM2MjgzMjIxZGFiZWMtYmRi"); // authorization


// console.log(peopleDB.get('people')
//         .filter({id:"Y2lzY29zcGFyazovL3VzL1BFT1BMRS82YTJiNDJlMi0wMGZlLTRjMzItYjFiNS03ZGFmZjFlMDE3NDY"})
//         .value()
//         );
