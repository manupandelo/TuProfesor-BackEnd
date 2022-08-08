import 'dotenv/config'
import connection from '../../db.js'

export class PeticionService {

    getPeticion = async () => {
        console.log('Get All Peticiones');
        let query=`SELECT * from Peticion`
      
        connection.query(query, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            return result;
      });
    }

    getPeticionById = async (id) => {
        console.log('Get Peticion by its ID');
        let query=`SELECT Profesor.nombre, Profesor.apellido, Peticion.horario, Alumno.nombre from Peticion inner join Alumno on Peticion.idAlumno=Alumno.id inner join Profesor on Peticion.idProfesor=Profesor.id where idPeticion = ?`;
        connection.query(query,[id],function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            return result;
      });
    }

    createPeticion = async (Peticion) => {
        console.log('create Peticion in Peticion Service');
        console.log(Peticion);
        let query=`INSERT INTO Peticion(idAlumno, idProfesor, detalles, horario) VALUES (?,?,?,?)`
        connection.query(query,[Peticion.idAlumno, Peticion.idProfesor, Peticion.detalles, Peticion.horario], function (err, result, fields) {
            if (err) throw err;
            console.log('affected rows:' + result.affectedRows);
            return;
        });
    }

    updatePeticionById = async (id, Peticion) => {
        console.log('Update Peticion by Id in Peticion Service');
        console.log(id, Peticion)
        let variables;
        let query;
        if(!Peticion.detalles){
            if(!Peticion.horario){
               return "Nada que cambiar";
            }else{
                query=`update Peticion SET horario=? where idPeticion=?`
                variables=[Peticion.horario, id]
            }
        }
        else{
            if(!Peticion.horario){
                query=`update Peticion SET detalles=? where idPeticion=?`
                variables=[Peticion.detalles, id]
            }
            else{
                query=`UPDATE Peticion SET detalles=?, horario=? WHERE idPeticion = ?`;
                variables=[Peticion.detalles, Peticion.horario, id]
            }
        }
        connection.query(query,variables, function (err, result, fields) {
            if (err) throw err;
            console.log('affected rows:' + result.affectedRows);
            return;
        });
    }

    deletePeticionById = async (id) => {
        console.log('Delete peticion by id in Peticion service');
        
        let query=`DELETE FROM Peticion WHERE idPeticion = ?`;
        connection.query(query,[id], function (err, result, fields) {
            if (err) throw err;
            console.log('affected rows:' + result.affectedRows);
            return;
          });
    }
}