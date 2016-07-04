// Database Utilities
module.exports = {
  // Function to check if ID exists on a specific database
   db_hasID : function(database, table, id){
      var result = false;
      var personid = database.get(table)
                  .find({ id: id })
                  .value();
      if (personid){
        result = true;
      }
      return result;
  },

 // fucntion to set authorization token for Cisco Spark
  updateUser_authorization : function (database, table, id, key){
    var res = database.get(table)
                    .find({ id: id })
                    .assign({ authorization : key })
                    .value();
  },

 // function to update user DisplayName from Cisco Spark
  updateUser_displayName : function (database, table, id, key){
    var res = database.get(table)
                    .find({ id: id })
                    .assign({ displayname : key })
                    .value();
  },

// function to update user DisplayName from Cisco Spark
  updateUser_avatar : function (database, table, id, key){
    var res = database.get(table)
                    .find({ id: id })
                    .assign({ avatar : key })
                    .value();
  },
  insert_user : function (database, table, key){
    var res = database.get(table)
      .push({ id: key.id,
              displayname: key.displayName,
              emails: key.emails,
              avatar: key.avatar,
              created: key.created,
              authorization: "PLEASE UPDATE"
            })
      .value();
  },
  delete_user : function (database, table,key){
    return database.get(table)
            .remove({ id : key })
            .value();
  }
}
