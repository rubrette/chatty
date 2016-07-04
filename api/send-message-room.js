
var Spark = require('node-sparky');
var spark = new Spark({
  token: "OWQ0YzdlYjUtMzY1ZS00NjZmLTgyN2YtZjQ2NzgxYTM2MjgzMjIxZGFiZWMtYmRi"
});


spark.messageSendPerson('rubrette@cisco.com', {
    text: 'Hello!',
    files: [require("../database/person.json")]
  })
  .then(function(message {
    console.log('Message sent: %s', message.txt) ;
  })
  .catch(function(err){
    console.log(err);
  });
