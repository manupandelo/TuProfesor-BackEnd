import 'dotenv/config'
import mysql from 'mysql2/promise'

var connection = await mysql.createConnection({
  host: process.env.server,
  user: process.env.user,
  password: process.env.pass,
  database: process.env.base
  /*host:'mysql.malamud.com.ar',
  user:'tuprofesorback',
  password:'TuProfesorBackend!#',
  database:'tuprofesorbackend'*/
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});

export default connection;