
    // if user exists
    var check_existing_user = dbutils.db_hasID(peopleDB,'people',personID);
    if (check_existing_user){
      // update user authorization token
      dbutils.delete_user (peopleDB, //Database
                                  'people', //Table
                                  personID); // person Object
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('_mycallback(ID ' + personID + ' was inserted.)');
    }else {
      res.writeHead(520, {'Content-Type': 'text/plain'});
      res.end('_mycallback(ID ' + personID + ' does not exist.)');
    };

}
