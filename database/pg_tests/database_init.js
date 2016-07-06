var pg = require('pg');

var DATABASE_URL = process.env.DATABASE_URL || "postgres://peikqpptrzvxby:1H-wrT-rEe0HHDgpmWpR4AqXwo@ec2-54-225-121-93.compute-1.amazonaws.com:5432/d575fi9qm9naq9";

pg.defaults.ssl = true;
pg.connect(DATABASE_URL, function(err, dbclient) {
  if (err) throw err;
  console.log('Connected to postgres!');

  // dbclient
  //   .query('SELECT people.displayName FROM public.people;')
  //   .on('row', function(row) {
  //     console.log(JSON.stringify(row));
  //   });


  var peopleObj = require ("../database/people.json");
  // console.log(peopleObj.people);
  var roomsObj = require ("../database/rooms.json");
  var messagesObj = require ("../database/messages.json");

  // var peopleObj = {};
    // peopleObj.id = 'Y2lzY29zcGFyazovL3VzL1BFT1BMRS82YTJiNDJlMi0wMGZlLTRjMzItYjFiNS03ZGFmZjFlMDE3NDY';
    // peopleObj.emails = ["rubrette@cisco.com","rbrettes@cisco.com"];
    // peopleObj.displayName = "Rui Brettes";
    // peopleObj.avatar = "https://1efa7a94ed216783e352-c62266528714497a17239ececf39e9e2.ssl.cf1.rackcdn.com/V1~bc4c0369d93341f586946fcc7c156ee3~MeA2EKCgTWOa2lZbW7vHUw==~1600";
    // peopleObj.created = "2012-06-15T20:27:18.364Z"

    var buttlerID = "Y2lzY29zcGFyazovL3VzL1BFT1BMRS8wMWIwN2RlNi1mNmE0LTQ3MWItYTlmMy0yOGNlODY2MDRlYjE";
    // Test DB Insert
    //Drop table if it exists
    // dbclient.query("DROP TABLE IF EXISTS people");
    // // Creat table and insert into it
    // dbclient.query("CREATE TABLE IF NOT EXISTS people(id varchar, emails text[], displayname varchar, avatar text, created text, oauth text)");
    //
    // // insert with json Objec
    // peopleObj.people.forEach(function(item){
    //   dbclient.query("INSERT INTO people(id, emails, displayname, avatar, created, oauth) values($1, $2, $3, $4, $5, $6)",
    //             [item.id,item.emails,item.displayname,item.avatar,item.created,item.authorization]);
    // });
    //
    // // ROOMS TABLE
    // dbclient.query("DROP TABLE IF EXISTS rooms");
    // // Creat table and insert into it
    // dbclient.query("CREATE TABLE IF NOT EXISTS rooms(id varchar, title text, type varchar, isLocked text, lastActivity text, created text, teamId text, peopleID text)");
    //
    // // insert with json Objec
    // roomsObj.items.forEach(function(room){
    //   dbclient.query("INSERT INTO rooms(id, title, type, isLocked, lastActivity, created, teamId, peopleID) values($1, $2, $3, $4, $5, $6, $7, $8)",
    //             [
    //               room.id,
    //               room.title,
    //               room.type,
    //               room.isLocked,
    //               room.created,
    //               room.created,
    //               room.teamId,
    //               buttlerID]);
    // });
    //
    // // Messages TABLE
    // dbclient.query("DROP TABLE IF EXISTS messages");
    // // Creat table and insert into it
    // dbclient.query("CREATE TABLE IF NOT EXISTS messages(id varchar, roomId text, files text[], personId text, personEmail text, created text)");
    //
    // // insert with json Objec
    // messagesObj.items.forEach(function(message){
    //   dbclient.query("INSERT INTO messages(id, roomId, files, personId, personEmail, created) values($1, $2, $3, $4, $5, $6)",
    //             [
    //               message.id,
    //               message.roomId,
    //               message.files,
    //               message.personId,
    //               message.personEmail,
    //               message.created
    //             ]);
    // });

    // Messages TABLE
    dbclient.query("DROP TABLE IF EXISTS actions");
    // Creat table and insert into it
    var query= "CREATE TABLE IF NOT EXISTS actions (id smallint NOT NULL DEFAULT nextval('action_id_seq'::regclass),action_order smallint,personId text,sendToRoom text,SendToEmail text,messageId text,sleep bigint,CONSTRAINT actions_pkey PRIMARY KEY (id)) TABLESPACE pg_default;";

    dbclient.query(query);

    dbclient.query("INSERT INTO actions(action_order, personId, sendToRoom, SendToEmail, messageId, sleep) values($1, $2, $3, $4, $5, $6)",
              [
                1, // Order
                "Y2lzY29zcGFyazovL3VzL1BFT1BMRS8wMWIwN2RlNi1mNmE0LTQ3MWItYTlmMy0yOGNlODY2MDRlYjE", // buttlerID
                "Y2lzY29zcGFyazovL3VzL1JPT00vYzMzMzFkZjAtZmYyOC0xMWU1LWJkZTUtYzMxNGQ2YjBkZGEw", // To Room
                "", // To Email
                "Y2lzY29zcGFyazovL3VzL01FU1NBR0UvNmY0ODg5NzAtNDIxNS0xMWU2LTlkZTUtOTNjMDkwYTkwNmEz", // Message
                "10000" //10 Seconds
              ]);

});
