module.exports = function (personID, req, res) {
    // Delete User into Database
    const low = require('lowdb');
    const fileAsync = require('lowdb/lib/file-async');
    const dbutils = require ("../database/database_utils");
    const peopleDB = low(__dirname + "/../database/people.json", { storage: fileAsync });

    peopleDB.defaults({ people: [] }).value();

    // if user exists
    var check_existing_user = dbutils.db_hasID(peopleDB,'people',personID);
    if (check_existing_user){
      // update user authorization token
      dbutils.delete_user (peopleDB, //Database
                                  'people', //Table
                                  personID); // person Object
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('_mycallback(ID ' + personID + ' was inserted.)');
    }else {
      res.writeHead(520, {'Content-Type': 'text/plain'});
      res.end('_mycallback(ID ' + personID + ' does not exist.)');
    };

}
