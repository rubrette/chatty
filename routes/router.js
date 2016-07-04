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
      postsObj: require ("../database/posts.json"),
      peopleObj: require ("../database/people.json")
    });
  });

  router.get("/about",function(req,res){
    res.render("index.ejs", {
      page: "about"
    });
  });

  // router.get("/contact",function(req,res){
  //   res.render("index.ejs", {
  //     page: "contact",
  //     items: ["a","b","c","d"]
  //   });
  // });


// END
}
