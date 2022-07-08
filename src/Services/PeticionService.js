import 'dotenv/config'
import peticionHelper from '../Helpers/PeticionHelper.js'
const ProfesorTabla = process.env.DB_TABLA_Profesor;
const PeticionTabla = process.env.DB_TABLA_Peticion;
const AlumnoTabla = process.env.DB_TABLA_Alumno;

export class PeticionService {

    getPeticion = async () => {
        console.log('Get All Peticiones');
        let response;
        let query=`SELECT * from ${PeticionTabla}`
      
        response = await peticionHelper(undefined, query);
        console.log(response)
        return response.recordset;
    }

    getPeticionById = async (id) => {
        console.log('Get Peticion by its ID');
        let response;
        let query=`SELECT Profesor.nombre, Profesor.apellido, Peticion.horario, Alumno.nombre from ${PeticionTabla} inner join ${AlumnoTabla} on ${PeticionTabla}.idAlumno=${AlumnoTabla}.id inner join ${ProfesorTabla} on ${PeticionTabla}.idProfesor=${ProfesorTabla}.id where idPeticion = @id`;
        response=await peticionHelper({id}, query)
        console.log(response)

        return response.recordset;
    }

    createPeticion = async (Peticion) => {
        console.log('create Peticion in Peticion Service');
        let response;
        let query=`INSERT INTO ${PeticionTabla}(idAlumno, idProfesor, detalles, horario) VALUES (@IdAlumno, @IdProfesor, @Detalles, @Horario)`
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
                query=`update ${PeticionTabla} SET horario=@Horario where idPeticion=@Id`
            }
        }
        else{
            if(!Peticion.horario){
                query=`update ${PeticionTabla} SET detalles=@Detalles where idPeticion=@Id`
            }
            else{
                query=`UPDATE ${PeticionTabla} SET detalles=@Detalles, horario=@Horario WHERE idPeticion = @id`;
            }
        }
        response = await peticionHelper({peticion, id},query);
        console.log(response)

        return response.recordset;
    }

    deletePeticionById = async (id) => {
        console.log('Delete peticion by id in Peticion service');
        let response;
        let query=`DELETE FROM ${PeticionTabla} WHERE idPeticion = @id`;
        const pool = await sql.connect(config);
        response = await peticionHelper(undefined,query);
        console.log(response)

        return response.recordset;
    }
}