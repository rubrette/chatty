module.exports = {

  connect : function() {
      var settings = require ('../config/settings.js');
      var pg = require('pg');
      pg.defaults.ssl = true;

      process.on('unhandledRejection', function(e) {
        console.log(e.message, e.stack)
      });

      return new pg.Pool(settings.database_config);

      pool.on('error', function (err, client) {
        console.error('idle client error', err.message, err.stack)
      });
    }, // END Connect

    // Functions for postgreSQL database
    // // People
    getPeople : function (pool, res, OrderBy, FilterBy){
      OrderBy = OrderBy || "";
      FilterBy = FilterBy || "";
      pool.connect(function(err, client, done) {
        if(err) {
              console.error('Error fetching client from database Pool', err);
            }
            var query = client.query("SELECT * FROM people " + OrderBy + " " + FilterBy,
              function(err, result) {
                  done(); // Release db connection
                  if(err) {
                    return console.error('error running query', err);
                  }
                  console.log("DATABASE: command " + result.command + " executed, " + result.rowCount + " rows affected");
                  // console.log(result.rows[0]);
                  res.send(result);
                });
              });
    }, //END getPeople

    insert_people : function (pool, res,  peopleObj){
      pool.connect(function(err, client, done) {
        if(err) {
              return console.error('Error fetching client from database Pool', err);
            }
            client.query("INSERT INTO people(id, emails, displayname, avatar, created, oauth) values($1, $2, $3, $4, $5, $6)",
              [peopleObj.id,peopleObj.emails,peopleObj.displayname,peopleObj.avatar,peopleObj.created,peopleObj.authorization],
              function(err, result) {
                  done(); // Release db connection
                  if(err) {
                    return console.error('error running query', err);
                  }
                  console.log("DATABASE: command " + result.command + " executed, " + result.rowCount + " rows affected");
                  // console.log(result.rows[0]);
                  res.send(result);
                });
        });
    }, //END insert_people

    update_people : function (pool, res,  peopleObj) {
      pool.connect(function(err, client, done) {
        if(err) {
              return console.error('Error fetching client from database Pool', err);
            }
            client.query("UPDATE people set id = $1 , emails = $2, displayname = $3, avatar = $4, created = $5, oauth = $6 WHERE id = $1",
              [peopleObj.id,peopleObj.emails,peopleObj.displayname,peopleObj.avatar,peopleObj.created,peopleObj.authorization],
              function(err, result) {
                  done(); // Release db connection
                  if(err) {
                    return console.error('error running query', err);
                  }
                  console.log("DATABASE: command " + result.command + " executed, " + result.rowCount + " rows affected");
                  res.send(result);
                });
        });
    }, // END update_people

    delete_people : function (pool, res,  id) {
      pool.connect(function(err, client, done) {
        if(err) {
              return console.error('Error fetching client from database Pool', err);
            }
            client.query("DELETE FROM  people WHERE id = '"+id+"'",
              function(err, result) {
                  done(); // Release db connection
                  if(err) {
                    return console.error('error running query', err);
                  }
                  console.log("DATABASE: command " + result.command + " executed, " + result.rowCount + " rows affected");
                  res.send(result);
                });
        });
    }, // END delete_people

    // Messages
    getMessages : function (pool, res, OrderBy, FilterBy){
      OrderBy = OrderBy || "";
      FilterBy = FilterBy || "";
      pool.connect(function(err, client, done) {
        if(err) {
              console.error('Error fetching client from database Pool', err);
            }
            var query = client.query("SELECT * FROM messages " + OrderBy + " " + FilterBy,
              function(err, result) {
                  done(); // Release db connection
                  if(err) {
                    return console.error('error running query', err);
                  }
                  console.log("DATABASE: command " + result.command + " executed, " + result.rowCount + " rows affected");
                  // console.log(result.rows[0]);
                  res.send(result);
                });
              });
    }, //END getMessages

    insert_message : function (pool, res,  res, message){
      pool.connect(function(err, client, done) {
        if(err) {
              return console.error('Error fetching client from database Pool', err);
            }
            client.query("INSERT INTO messages(id, roomId, files, personId, personEmail, created) values($1, $2, $3, $4, $5, $6)",
                      [
                        message.id,
                        message.roomId,
                        message.files,
                        message.personId,
                        message.personEmail,
                        message.created
                      ],
              function(err, result) {
                  done(); // Release db connection
                  if(err) {
                    return console.error('error running query', err);
                  }
                  console.log("DATABASE: command " + result.command + " executed, " + result.rowCount + " rows affected");
                  // console.log(result.rows[0]);
                  res.send(result);
                });
        });
    }, //END insert_message

    update_message : function (pool, res,  message) {
      pool.connect(function(err, client, done) {
        if(err) {
              return console.error('Error fetching client from database Pool', err);
            }
            client.query("UPDATE messages set id = $1, roomId = $2, files = $3, personId = $4, personEmail = $5, created = $5  WHERE id = $1",
                      [
                        message.id,
                        message.roomId,
                        message.files,
                        message.personId,
                        message.personEmail,
                        message.created
                      ],
              function(err, result) {
                  done(); // Release db connection
                  if(err) {
                    return console.error('error running query', err);
                  }
                  console.log("DATABASE: command " + result.command + " executed, " + result.rowCount + " rows affected");
                  res.send(result);
                });
        });
    }, // END update_message

    delete_message : function (pool, res,  id) {
      pool.connect(function(err, client, done) {
        if(err) {
              return console.error('Error fetching client from database Pool', err);
            }
            client.query("DELETE FROM messages WHERE id = '"+id+"'",
              function(err, result) {
                  done(); // Release db connection
                  if(err) {
                    return console.error('error running query', err);
                  }
                  console.log("DATABASE: command " + result.command + " executed, " + result.rowCount + " rows affected");
                  res.send(result);
                });
        });
    }, // END delete_message

    // Rooms
    getRooms : function (pool, res, OrderBy, FilterBy){
      OrderBy = OrderBy || "";
      FilterBy = FilterBy || "";
      pool.connect(function(err, client, done) {
        if(err) {
              console.error('Error fetching client from database Pool', err);
            }
            var query = client.query("SELECT * FROM rooms " + OrderBy + " " + FilterBy,
              function(err, result) {
                  done(); // Release db connection
                  if(err) {
                    return console.error('error running query', err);
                  }
                  console.log("DATABASE: command " + result.command + " executed, " + result.rowCount + " rows affected");
                  // console.log(result.rows[0]);
                  //res.send(result);
                  res.send(result);
                });
                query.on('row', function(row) {
                  console.log(row);
                });
              });
    }, //END getRooms

    insert_room : function (pool, res,  room){
      pool.connect(function(err, client, done) {
        if(err) {
              return console.error('Error fetching client from database Pool', err);
            }

            client.query("INSERT INTO rooms(id, title, type, isLocked, lastActivity, created, teamId, peopleID) values($1, $2, $3, $4, $5, $6, $7, $8)",
                      [
                        room.id,
                        room.title,
                        room.type,
                        room.isLocked,
                        room.created,
                        room.created,
                        room.teamId,
                        room.peopleID
                      ],
              function(err, result) {
                  done(); // Release db connection
                  if(err) {
                    return console.error('error running query', err);
                  }
                  console.log("DATABASE: command " + result.command + " executed, " + result.rowCount + " rows affected");
                  // console.log(result.rows[0]);
                  res.send(result);
                });
        });
    }, //END insert_room

    update_room : function (pool, res,  room) {
      pool.connect(function(err, client, done) {
        if(err) {
              return console.error('Error fetching client from database Pool', err);
            }
            client.query("UPDATE rooms set id = $1, title = $2, type = $3, isLocked = $4, lastActivity = $5, created = $6, teamId = $7, peopleID = $8  WHERE id = $1",
                      [
                        room.id,
                        room.title,
                        room.type,
                        room.isLocked,
                        room.lastActivity,
                        room.created,
                        room.teamId,
                        room.peopleID
                      ],
              function(err, result) {
                  done(); // Release db connection
                  if(err) {
                    return console.error('error running query', err);
                  }
                  console.log("DATABASE: command " + result.command + " executed, " + result.rowCount + " rows affected");
                  res.send(result);
                });
        });
    }, // END update_room

    delete_room : function (pool, res,  id) {
      pool.connect(function(err, client, done) {
        if(err) {
              return console.error('Error fetching client from database Pool', err);
            }
            client.query("DELETE FROM rooms WHERE id = '"+id+"'",
              function(err, result) {
                  done(); // Release db connection
                  if(err) {
                    return console.error('error running query', err);
                  }
                  console.log("DATABASE: command " + result.command + " executed, " + result.rowCount + " rows affected");
                  res.send(result);
                });
        });
    }, // END delete_room

    // Actions
    getActions : function (pool, res, OrderBy, FilterBy){
      OrderBy = OrderBy || "";
      FilterBy = FilterBy || "";
      pool.connect(function(err, client, done) {
        if(err) {
              console.error('Error fetching client from database Pool', err);
            }
            var query = client.query("SELECT * FROM actions " + OrderBy + " " + FilterBy,
              function(err, result) {
                  done(); // Release db connection
                  if(err) {
                    return console.error('error running query', err);
                  }
                  console.log("DATABASE: command " + result.command + " executed, " + result.rowCount + " rows affected");
                  // console.log(result.rows[0]);
                  //res.send(result);
                  res.send(result);
                });
                query.on('row', function(row) {
                  console.log(row);

                });
              });
    }, //END getActions

    insert_action : function (pool, res,  action){
      return pool.connect(function(err, client, done) {
        if(err) {
              return console.error('Error fetching client from database Pool', err);
            }

            return client.query("INSERT INTO actions(action_order, personId, sendToRoom, SendToEmail, messageId, sleep) values($1, $2, $3, $4, $5, $6)",
                      [
                        action.action_order,
                        action.personId,
                        action.sendToRoom,
                        action.SendToEmail,
                        action.messageId,
                        action.sleep
                      ],
              function(err, result) {
                  done(); // Release db connection
                  if(err) {
                    return console.error('error running query', err);
                  }
                  console.log("DATABASE: command " + result.command + " executed, " + result.rowCount + " rows affected");
                  // console.log(result.rows[0]);
                  res.send(result);
                });
        });
    }, //END insert_action

    update_action : function (pool, res,  action) {
      pool.connect(function(err, client, done) {
        if(err) {
              return console.error('Error fetching client from database Pool', err);
            }
            client.query("UPDATE actions set action_order = $2, personId = $3, sendToRoom = $4, SendToEmail = $5, messageId = $6, sleep = $7  WHERE id = $1",
                      [
                        action.id,
                        action.action_order,
                        action.personId,
                        action.sendToRoom,
                        action.SendToEmail,
                        action.messageId,
                        action.sleep
                      ],
              function(err, result) {
                  done(); // Release db connection
                  if(err) {
                    return console.error('error running query', err);
                  }
                  console.log("DATABASE: command " + result.command + " executed, " + result.rowCount + " rows affected");
                  res.send(result);
                });
        });
    }, // END update_action

    delete_action : function (pool, res,  id) {
      pool.connect(function(err, client, done) {
        if(err) {
              return console.error('Error fetching client from database Pool', err);
            }
            client.query("DELETE FROM actions WHERE id = '"+id+"'",
              function(err, result) {
                  done(); // Release db connection
                  if(err) {
                    return console.error('error running query', err);
                  }
                  console.log("DATABASE: command " + result.command + " executed, " + result.rowCount + " rows affected");
                  res.send(result);
                });
        });
    } // END delete_action


// EOF
}
