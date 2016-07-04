module.exports = function (router) {

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
    var messageBody = req.body.messageBody;
    var personid = req.body.personid;
    var toPerson = req.body.toPerson;
    var room = req.body.room;
    var file = req.body.file;

    console.log(toPerson);

    var Spark = require('node-sparky');
    var spark = new Spark({
      token: "OWQ0YzdlYjUtMzY1ZS00NjZmLTgyN2YtZjQ2NzgxYTM2MjgzMjIxZGFiZWMtYmRi"
    });

    var messageObj = {
        text: messageBody
        // files: [file]
      }
    spark.messageSendPerson(toPerson, messageObj)
      .then(function(message) {
        console.log('Message sent: %s', message.text) ;
        res.send("OK");
      })
      .catch(function(err){
        console.log(err);
        res.send("OK");
      });

  });

// END
}
