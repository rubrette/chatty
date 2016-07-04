module.exports = function (router) {

  // log action from Browser
  router.use(function (req,res,next) {
    console.log("Base Router: /" + req.method + " URL: " + req.originalUrl);
    next();
  });

  // Define Router routes
  router.get("/",function(req,res){
    res.render("index.ejs", {page:'main.ejs'});
  });

  router.get("/users",function(req,res){
    res.render("index.ejs", {
      page: "users",
      peopleObj: require ("../database/people.json")
    });
  });

  router.get("/messages",function(req,res){
    res.render("index.ejs", {
      page: "messages",
      roomsObj: require ("../database/rooms.json"),
      postsObj: require ("../database/posts.json"),
      peopleObj: require ("../database/people.json")
    });
  });

  router.get("/about",function(req,res){
    res.render("index.ejs", {
      page: "about"
    });
  });

  router.get("/rooms",function(req,res){
    res.render("index.ejs", {
      page: "rooms",
      roomsObj: require ("../database/rooms.json"),
      postsObj: require ("../database/posts.json"),
      peopleObj: require ("../database/people.json")
    });
  });

  router.get("/actions",function(req,res){
    res.render("index.ejs", {
      page: "actions",
      postsObj: require ("../database/rooms.json"),
      peopleObj: require ("../database/people.json")
    });
  });

// END
}
