module.exports = function (personID, oAuthToken){
    const low = require('lowdb');
    const fileAsync = require('lowdb/lib/file-async');
    const dbutils = require ("../../database/database_utils");
    const peopleDB = low('../../database/people.json', {
      storage: fileAsync
    });

    peopleDB.defaults({ people: [] })
       .value();

    // if user exists
    var check_existing_user = dbutils.db_hasID(peopleDB,'people',oAuthToken);
    if (check_existing_user){
      // update user authorization token
      dbutils.updateUser_authorization(peopleDB, //Database
                                  'people', //Table
                                  personID, //ID
                                  oAuthToken); // authorization
    };

};
