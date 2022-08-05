import 'dotenv/config'
import mysql from 'mysql'

var connection = mysql.createConnection({
  host : 'mysql.malamud.com',
  user     : 'tuprofesorback',
  password : 'TuProfesorBackend!#',
  database : 'tuprofesorbackend'
});

export default connection;