var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var views_path = __dirname + '/views/';

// Config views
app.set('view engine', 'ejs');
app.set('views', views_path)

//Middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Set Express router
var router = express.Router();
// set public access folder (Images, CSS, Avatars, etc)
router.use(express.static('public'));
// set Express Router ROUTES
var routes = require (__dirname + "/routes/router")(router);
//routes(router);
// instanciate Router
app.use("/",router);


// Set express Router API
var api = require (__dirname + "/routes/api")(router);
// instanciate Router API
app.use("/api",router);


// Catch all non existent routes to 404
app.use("*",function(req,res){
  res.sendFile(views_path + "404.html");
});

// WebServer instanciate
var serverPort = 18018;
app.listen(serverPort,function(){
  console.log("Live at Port " + serverPort);
});

// END EOF
