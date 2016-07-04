module.exports = function (SearchEmail, oAuthToken, req, res) {
  // invoque SPARK API
  var Spark = require('node-sparky');
  var spark = new Spark({
    token: oAuthToken
  });
  return spark.personByEmail(SearchEmail)
        .then(function(person) {
          console.log("Got:");
          console.log(person);

          // Check if Spark has found a person before inserting
          if (!Object.keys(person).length == false) {
              // Insert User into Database
              const low = require('lowdb');
              const fileAsync = require('lowdb/lib/file-async');
              const dbutils = require ("../database/database_utils");
              const peopleDB = low(__dirname + "/../database/people.json", { storage: fileAsync });

              peopleDB.defaults({ people: [] }).value();
              // if user exists
              var check_existing_user = dbutils.db_hasID(peopleDB,'people',person.id);
              // console.log(!Object.keys(person).length);
              if (!check_existing_user) {
              //   // update user authorization token
                dbutils.insert_user (peopleDB, //Database
                                            'people', //Table
                                            person); // person Object
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end('_mycallback(User ' + person.displayName + ' was inserted.)');
              }else {
                res.writeHead(520, {'Content-Type': 'text/plain'});
                res.end('_mycallback(User ' + person.displayName + ' Already existent.)');
              };
            };
          })
          .catch(function(err) {
            // process error
            console.log(err);
            res.writeHead(520, {'Content-Type': 'text/plain'});
            res.end('_mycallback(' + err + ')');
          });
}
