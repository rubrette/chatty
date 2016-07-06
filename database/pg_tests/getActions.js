module.exports = function (pool, res) {
  pool.connect(function(err, client, done) {
    if(err) {
          console.error('Error fetching client from database Pool', err);
        }
        var query = client.query("SELECT action_order, personId, sendToRoom, SendToEmail, messageId, sleep FROM actions ",
          function(err, result) {
              done(); // Release db connection
              if(err) {
                return console.error('error running query', err);
              }
              console.log("DATABASE: command " + result.command + " executed, " + result.rowCount + " rows affected");
              // console.log(result.rows[0]);
              //return result;
            });
            query.on('row', function(row) {
              console.log(row);
              res.send(row);
            });
          });
}
