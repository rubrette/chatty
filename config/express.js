var express = require("express");
var bodyParser = require("body-parser");

module.exports = funcion() {
  var app = express();
  var router = express.Router();
  var path = __dirname + '/views/';

  router.use(express.static('public'));

  router.use(function (req,res,next) {
    console.log("/" + req.method);
    next();
  });

  router.get("/",function(req,res){
    res.render(path + "index");
  });

  router.get("/users",function(req,res){
    res.sendFile(path + "users.html");
  });

  router.get("/about",function(req,res){
    res.sendFile(path + "about.html");
  });

  router.get("/contact",function(req,res){
    res.sendFile(path + "contact.html");
  });

  app.use("/",router);

  app.use("*",function(req,res){
    res.sendFile(path + "404.html");
  });

  app.listen(3000,function(){
    console.log("Live at Port 3000");
  });

}
