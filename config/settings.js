var settings = {
  // database_config
  DATABASE_URL:"postgres://peikqpptrzvxby:1H-wrT-rEe0HHDgpmWpR4AqXwo@ec2-54-225-121-93.compute-1.amazonaws.com:5432/d575fi9qm9naq9",
  database_config : {
    host     : "ec2-54-225-121-93.compute-1.amazonaws.com",
    user     : "peikqpptrzvxby",
    password :"1H-wrT-rEe0HHDgpmWpR4AqXwo",
    database :"d575fi9qm9naq9",
    port     : 5432,
    max      : 10,
    idleTimeoutMillis: 30000
  },
  //
  WORKING_MODE:"ONLINE"
}
module.exports = settings;
