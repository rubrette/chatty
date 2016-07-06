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
        // if an error is encountered by a client while it sits idle in the pool
        // the pool itself will emit an error event with both the error and
        // the client which emitted the original error
        // this is a rare occurrence but can happen if there is a network partition
        // between your application and the database, the database restarts, etc.
        // and so you might want to handle it and at least log it out
        console.error('idle client error', err.message, err.stack)
      });
    }, // END Connect


    // Functions for postgreSQL database
    // // USERS

    insert_people : function (pool, peopleObj){
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
                  return result;
                });
        });
    }, //END insert_people

    update_people : function (pool, peopleObj) {
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
                  return result;
                });
        });
    }, // END update_people

    delete_people : function (pool, id) {
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
                  return result;
                });
        });
    }, // END delete_people

    // Messages
    insert_message : function (pool, message){
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
                  return result;
                });
        });
    }, //END insert_message

    update_message : function (pool, message) {
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
                  return result;
                });
        });
    }, // END update_message

    delete_message : function (pool, id) {
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
                  return result;
                });
        });
    }, // END delete_message

    // Rooms
    insert_room : function (pool, room){
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
                  return result;
                });
        });
    }, //END insert_room

    update_room : function (pool, room) {
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
                  return result;
                });
        });
    }, // END update_room

    delete_room : function (pool, id) {
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
                  return result;
                });
        });
    }, // END delete_room

    // Actions
    get_actions : function (pool, OrderBy, FilterBy){
      var returnObj = {};
      returnObj = pool.connect(function(err, client, done) {
        if(err) {
              console.error('Error fetching client from database Pool', err);
            }
            var query = client.query("SELECT action_order, personId, sendToRoom, SendToEmail, messageId, sleep FROM actions " + OrderBy + " " + FilterBy,
              function(err, result) {
                  done(); // Release db connection
                  if(err) {
                    return console.error('error running query', err);
                  }
                  console.log("DATABASE: command " + result.command + " executed, " + result.rowCount + " rows affected");
                  // console.log(result.rows[0]);
                  //return result;
                  returnObj.result = result;
                });
                query.on('row', function(row) {
                  console.log(row);
                  returnObj = returnObj + row;
                    return returnObj;
                });

        });
        return returnObj;
    }, //END insert_action

    insert_action : function (pool, action){
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
                  return result;
                });
        });
    }, //END insert_action

    update_action : function (pool, action) {
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
                  return result;
                });
        });
    }, // END update_action

    delete_action : function (pool, id) {
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
                  return result;
                });
        });
    } // END delete_action


// EOF
}
