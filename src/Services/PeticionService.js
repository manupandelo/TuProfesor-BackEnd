import 'dotenv/config'
import connection from '../../db.js'

export class PeticionService {

    getPeticion = async () => {
        try{
            console.log('Get All Peticiones');
            let query=`SELECT * from Peticion`
            const [result,fields] = await connection.execute(query);
            console.log(result);
            return result;
        }   
        catch(error){
            return error;
        }   
    }

    getPeticionById = async (id) => {
        try{
            console.log('Get Peticion by its ID');
            let query=`SELECT Profesor.nombre, Profesor.apellido, Peticion.horario, Alumno.nombre from Peticion inner join Usuario on Peticion.idAlumno=Usuario.id inner join Alumno on Usuario.id=Alumno.idUser inner join Profesor on Peticion.idProfesor=Profesor.id where idPeticion = ?`;
            const [result,fields] = await connection.execute(query,[id]);
            console.log(result);
            return result;
        }   
        catch(error){
            return error;
        }   
    }

    createPeticion = async (Peticion) => {
        try{
            console.log('create Peticion in Peticion Service');
            console.log(Peticion);
            let query=`INSERT INTO Peticion(idUserAlumno, idProfesor, detalles, horario) VALUES (?,?,?,?)`
            const [result,fields] = await connection.execute(query,[Peticion.idUserAlumno, Peticion.idProfesor, Peticion.detalles, Peticion.horario]);
            console.log("Row affected: " + result.rowsAffected);
            console.log(result);
            return result;
        }   
        catch(error){
            return error;
        }   
    }

    updatePeticionById = async (id, Peticion) => {
        try{
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
            const [result,fields] = await connection.execute(query,variables);
            console.log("Rows affected: " + result.rowsAffected);
            console.log(result);
            return result;
        }   
        catch(error){
            return error;
        }   
    }

    deletePeticionById = async (id) => {
        try{
            console.log('Delete peticion by id in Peticion service');
        
            let query=`DELETE FROM Peticion WHERE idPeticion = ?`;
            const [result,fields] = await connection.execute(query,[id]);
            console.log("Rows affected: " + result.rowsAffected);
            console.log(result);    
            return result;
        }   
        catch(error){
            return error;
        }   
    }
}
