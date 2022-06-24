import 'dotenv/config'
import AlumnoHelper from '../Helpers/PeticionHelper.js'
import peticionHelper from '../Helpers/PeticionHelper.js'
import ReviewHelper from '../Helpers/ReviewHelper.js'

const ReviewTabla = process.env.DB_TABLA_Review;
const PeticionTabla = process.env.DB_TABLA_Peticion;
const AlumnoTabla = process.env.DB_TABLA_Alumno;

export class AlumnoService {

    getAlumno = async (filtros) => {
        console.log('Get All Alumnos in Alumno Service');
        let response;
        let query=`SELECT * from ${AlumnoTabla}`
        response=AlumnoHelper(undefined,query);
        console.log(response)
        return response.recordset;
    }

    getAlumnoById = async (id) => {
        console.log('Get Alumno By Id in Alumno Service');
        let response;
        let query=`SELECT * from ${AlumnoTabla} where id = @id`
        response=AlumnoHelper({id},query);
        console.log(response)
        return response.recordset;
    }

    getPeticionByUserId = async (id) => {
        console.log('Get Peticion by the User Id');
        let response;
        let query=`SELECT * from ${PeticionTabla} where idAlumno = @id`
        response=peticionHelper({id}, query);
        console.log(response)
        return response.recordset;
    }

    getReviewByUserId = async (id) => {
        console.log('Get Peticion by the User Id');
        let response;
        let query=`SELECT * from ${ReviewTabla} where idAlumno = @id`
        response=ReviewHelper({id}, query);
        console.log(response)
        return response.recordset;
    }

    createAlumno = async (Alumno) => {
        console.log('Create New Alumno in Alumno Service');
        //Ver bien como hacer que se inserten todas las variables y que no esten en null
        let response;
        let query=`INSERT INTO ${AlumnoTabla}(ubicacion, nombre, apellido, idUser) VALUES (@Ubicacion, @Nombre, @Apellido, @IdUser)`
        response=AlumnoHelper({Alumno}, query);
        console.log(response)
        return response.recordset;
    }
    
    updateAlumnoById = async (id, Alumno) => {
        //ver encriptacion para claves y/o emails
        console.log('Update Alumno by Id in Alumno Service');
        console.log(id, Alumno)
        let response;
        let count=0;
        let comma=false
        let query=`UPDATE ${AlumnoTabla} SET`;
        if(Alumno.ubicacion){            
            query+=` ubicacion=@Ubicacion`
            comma=true;
            count++;
        }// dejo por el dia en el que haya que meter mas datos
        if(count==0){return "Nada que cambiar"}
        else{
            response=AlumnoHelper({id, Alumno}, query);
            console.log(response)
            return response.recordset;
        }
    }

    deleteAlumnoById = async (id) => {
        console.log('Delete Alumno by Id in Alumno Service');
        let response;
        let query=`DELETE FROM ${AlumnoTabla} WHERE id = @id`;
        response=AlumnoHelper(undefined, query);
        console.log(response)
        return response.recordset;
    }
}