module.exports = function (router) {
  // Define dependent packages
  // // Settings
  // var settings = require ('../config/settings.js');
  // // Database
  // var postgreSQL = require('pg');
  // postgreSQL.defaults.ssl = true;
  // process.on('unhandledRejection', function(e) {
  //   console.log(e.message, e.stack)
  // });
  // var pool =  new postgreSQL.Pool(settings.database_config);
  // pool.on('error', function (err, client) {
  //   console.error('idle client error', err.message, err.stack)
  // });

  var database = require ("../database/pg_database");
  var pool = database.connect();

  // log action from Browser
  router.use(function (req,res,next) {
    console.log("API Router: /" + req.method + " URL: " + req.originalUrl);

    next();
  });

  // Define Router routes
  router.post("/updateUser_authorization",function(req,res){
    var oAuthToken = req.body.oAuthToken;
    var personID = req.body.personID;

    console.log("Got a Token: " + oAuthToken);
    console.log("For personID: " + personID);
    var userUtils = require("../api/userUpdateToken")(personID, oAuthToken);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('_mycallback("Updated")');
  });

  // Route add user by email
  router.post("/api/spark-get-user-by-email",function(req,res){
    var oAuthToken = req.body.oAuthToken;
    var SearchEmail = req.body.SearchEmail;
    // console.log("Got a SearchEmail: " + SearchEmail);
    // console.log("For oAuthToken: " + oAuthToken);
    var userAddByEmail = require ("../api/user-add-by-email")(SearchEmail, oAuthToken, req, res)
  });

  // route DELETE user by ID
  router.post("/api/deleteUser",function(req,res){
    var personID = req.body.personID;
    console.log(personID);
    // console.log("Got a SearchEmail: " + SearchEmail);
    var userAddByEmail = require ("../api/delete-user")(personID, req, res)
  });

  // Test Message
  router.post("/api/add-post-message",function(req,res){
    console.log("API Router - ADD Post");
    var body = req.body;
    ;

    // console.log("Test:" + sendTestMessage);
    console.log(body);
    if (body.sendTestMessage == "on" && body.destination_type != ""){
      body.fromID = body.fromSelector.split(",")[0];
      body.fromAuthorization = body.fromSelector.split(",")[1];

      // console.log(body.fromSelector);
      // console.log("From: " + body.fromID);
      // console.log("oAuth: " + body.fromAuthorization);

      var Spark = require('node-sparky');
      var spark = new Spark({
        token: body.fromAuthorization
      });

      var messageObj = {
          text: body.messageBody
          // files: [file]
        };
      if (body.file != null && body.file != "") {messageObj.files = [file];};
      console.log(body.toID);
      if (body.destination_type == "email" && body.toID != ""){
        spark.messageSendPerson(body.toID, messageObj)
          .then(function(message) {
            console.log('Message sent: %s', message.text) ;
            res.send("OK");
          })
          .catch(function(err){
            console.log(err);
            res.send("OK");
          });
        };

        if (body.destination_type == "room"){
          console.log("Room: " + body.room_destination);
          spark.messageSendRoom(body.room_destination, messageObj)
            .then(function(message) {
              console.log('Message sent: %s', message.text);
              res.send("OK");
            })
            .catch(function(err){
              console.log(err);
              res.send("Error");
            });

          };
      }else{
        res.send("Nothing to do");
        console.log("Nothing to do!");
      };
  });

  // route GET actions
  router.get("/api/getActions",function(req,res){
    database.getActions(pool, res, "ORDER BY action_order ASC");
  });

  // route GET people
  router.get("/api/getPeople",function(req,res){
    database.getPeople(pool, res, "ORDER BY displayname ASC");
  });

  // route GET rooms
  router.get("/api/getRooms",function(req,res){
    database.getRooms(pool, res, "ORDER BY type, title ASC");
  });

  // route GET Messages
  router.get("/api/getMessages",function(req,res){
    database.getMessages(pool, res, "ORDER BY id ASC");
  });


// END
}
