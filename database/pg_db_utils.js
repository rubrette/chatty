pool.connect(function(err, client, done) {
  if(err) {
        return console.error('Error fetching client from database Pool', err);
      }
      client.query('SELECT $1::int AS number', ['1'], function(err, result) {
      //call `done()` to release the client back to the pool
      done();

      if(err) {
        return console.error('error running query', err);
      }
      console.log(result.rows[0].number);
      //output: 1
      console.log("query done!");
    });
  });

  pool.on('error', function (err, client) {
    // if an error is encountered by a client while it sits idle in the pool
    // the pool itself will emit an error event with both the error and
    // the client which emitted the original error
    // this is a rare occurrence but can happen if there is a network partition
    // between your application and the database, the database restarts, etc.
    // and so you might want to handle it and at least log it out
    console.error('idle client error', err.message, err.stack)
  })

// var DATABASE_URL = process.env.DATABASE_URL || settings.DATABASE_URL;
//
// pg.connect(DATABASE_URL, function(err, dbclient) {
//   if (err) throw err;
//   console.log('Connected to postgres!');

  // Functions for postgreSQL database

  // // USERS
  // pg_insert_user : function (peopleObj){
  //   dbclient.query("INSERT INTO people(id, emails, displayname, avatar, created, oauth) values($1, $2, $3, $4, $5, $6)",
  //             [item.id,item.emails,item.displayname,item.avatar,item.created,item.authorization]);
  // },
