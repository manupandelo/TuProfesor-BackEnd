import 'dotenv/config'
import mysql from 'mysql'

var connection = mysql.createConnection({
  host:'mysql.malamud.com.ar',
  user:'tuprofesorback',
  password:'TuProfesorBackend!#',
  database:'tuprofesorbackend'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});

export default connection;