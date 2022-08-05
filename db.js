import 'dotenv/config'
import mysql from 'mysql'

var connection = mysql.createConnection({
  host:'mysql.malamud.com.ar',
  user:'tuprofesorback',
  password:'TuProfesorBackend!#',
  database:'tuprofesorbackend'
});

export default connection;