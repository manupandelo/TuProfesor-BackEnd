import 'dotenv/config'
import mysql from 'mysql'
import config from '../../db.js'

const Profesor = process.env.DB_TABLA_Profesor;
const PeticionTabla = process.env.DB_TABLA_Peticion;
const AlumnoTabla = process.env.DB_TABLA_Alumno;
var connection = mysql.createConnection(config);

export class PeticionService {

    getPeticion = async () => {
        console.log('Get All Peticiones');
        let response;
        let query=`SELECT * from Peticion`
      
        response = await peticionHelper(undefined, query);
        console.log(response)
        return response.recordset;
    }

    getPeticionById = async (id) => {
        console.log('Get Peticion by its ID');
        let response;
        let query=`SELECT Profesor.nombre, Profesor.apellido, Peticion.horario, Alumno.nombre from Peticion inner join Alumno on Peticion.idAlumno=Alumno.id inner join Profesor on Peticion.idProfesor=Profesor.id where idPeticion = @id`;
        response=await peticionHelper({id}, query)
        console.log(response)

        return response.recordset;
    }

    createPeticion = async (Peticion) => {
        console.log('create Peticion in Peticion Service');
        let response;
        let query=`INSERT INTO Peticion(idAlumno, idProfesor, detalles, horario) VALUES (@IdAlumno, @IdProfesor, @Detalles, @Horario)`
        response=await peticionHelper({Peticion},query);
        console.log(response)
        return response.recordset;
    }

    updatePeticionById = async (id, Peticion) => {
        console.log('Update Peticion by Id in Peticion Service');
        console.log(id, Peticion)
        let response;
        let query;
        if(!Peticion.detalles){
            if(!Peticion.horario){
               return "Nada que cambiar";
            }else{
                query=`update Peticion SET horario=@Horario where idPeticion=@Id`
            }
        }
        else{
            if(!Peticion.horario){
                query=`update Peticion SET detalles=@Detalles where idPeticion=@Id`
            }
            else{
                query=`UPDATE Peticion SET detalles=@Detalles, horario=@Horario WHERE idPeticion = @id`;
            }
        }
        response = await peticionHelper({peticion, id},query);
        console.log(response)

        return response.recordset;
    }

    deletePeticionById = async (id) => {
        console.log('Delete peticion by id in Peticion service');
        let response;
        let query=`DELETE FROM Peticion WHERE idPeticion = @id`;
        const pool = await sql.connect(config);
        response = await peticionHelper(undefined,query);
        console.log(response)

        return response.recordset;
    }
}