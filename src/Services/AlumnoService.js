import 'dotenv/config'
import connection from '../../db.js'

export class AlumnoService {

    getAlumno = async () => {
        console.log('Get All Alumnos in Alumno Service');
        let query=`SELECT * from Alumno`
        connection.query(query, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            return result;
      });
    }

    getAlumnoById = async (id) => {
        console.log('Get Alumno By Id in Alumno Service');
        
        let query=`SELECT * from Alumno where id = ?`
        connection.query(query, [id], function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            return result;
      });
    }

    getPeticionByUserId = async (id) => {
        console.log('Get Peticion by the User Id');
        
        let query=`SELECT * from Peticion where idAlumno = ?`
        connection.query(query,[id], function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            return result;
      });
    }

    getReviewByUserId = async (id) => {
        console.log('Get Peticion by the User Id');
        
        let query=`SELECT * from Review where idAlumno = ?`
        connection.query(query, [id], function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            return result;
      });
    }

    createAlumno = async (Alumno) => {
        console.log('Create New Alumno in Alumno Service');
        let id=Alumno.idUser;
        
        let responsetype;
        let query=`INSERT INTO Alumno(ubicacion, nombre, apellido, idUser) VALUES (?, ?, ?, ?)`
        let query2=`select * from Usuario where id=?`
        responsetype= await UsuarioHelper({id},query2);
        console.log(responsetype.recordset[0].tipo)
        if(responsetype.recordset[0].tipo==true){
            connection.query(query,[Alumno.ubicacion, Alumno.nombre, Alumno.apellido, Alumno.idUser], function (err, result, fields) {
                if (err) throw err;
                console.log('affected rows: ' + result.affectedRows);
                return;
              });
        }else{
            return "Fallo";
        }
    }
    
    updateAlumnoById = async (id, Alumno) => {
        console.log('Update Alumno by Id in Alumno Service');
        console.log(id, Alumno)
        
        let count=0;
        let comma=false
        let query=`UPDATE Alumno SET`;
        if(Alumno.ubicacion){            
            query+=` ubicacion=?`
            comma=true;
            count++;
        }// dejo por el dia en el que haya que meter mas datos
        if(count==0){return "Nada que cambiar"}
        else{
            query+=` WHERE id=?`
            connection.query(query,[Alumno.ubicacion, id], function (err, result, fields) { //Como solo hay una variable q se puede cambiar lo dejamos ahi, dsps capaz hay q cambiar
                if (err) throw err;
                console.log('affected rows: ' + result.affectedRows);
                return;
              });
        }
    }

    deleteAlumnoById = async (id) => {
        console.log('Delete Alumno by Id in Alumno Service');
        let query=`DELETE FROM Alumno WHERE id = ?`;
        connection.query(query,[id], function (err, result, fields) {
            if (err) throw err;
            console.log('affected rows: ' + result.affectedRows);
            return;
          });
    }
}