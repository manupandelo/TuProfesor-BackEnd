import 'dotenv/config'
import AlumnoHelper from '../Helpers/PeticionHelper.js'
import peticionHelper from '../Helpers/PeticionHelper.js'
import ReviewHelper from '../Helpers/ReviewHelper.js'
import UsuarioHelper from '../Helpers/UsuarioHelper.js'

const ReviewTabla = process.env.DB_TABLA_Review;
const PeticionTabla = process.env.DB_TABLA_Peticion;
const AlumnoTabla = process.env.DB_TABLA_Alumno;
const UsuarioTabla = process.env.DB_TABLA_Usuario;

export class AlumnoService {

    getAlumno = async () => {
        console.log('Get All Alumnos in Alumno Service');
        let response;
        let query=`SELECT * from ${AlumnoTabla}`
        response= await AlumnoHelper(undefined,query);
        console.log(response)
        return response.recordset;
    }

    getAlumnoById = async (id) => {
        console.log('Get Alumno By Id in Alumno Service');
        let response;
        let query=`SELECT * from ${AlumnoTabla} where id = @id`
        response= await AlumnoHelper({id},query);
        console.log(response)
        return response.recordset;
    }

    getPeticionByUserId = async (id) => {
        console.log('Get Peticion by the User Id');
        let response;
        let query=`SELECT * from ${PeticionTabla} where idAlumno = @id`
        response= await peticionHelper({id}, query);
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
        let id=Alumno.idUser;
        let response;
        let responsetype;
        let query=`INSERT INTO ${AlumnoTabla}(ubicacion, nombre, apellido, idUser) VALUES (@Ubicacion, @Nombre, @Apellido, @IdUser)`
        let query2=`select * from ${UsuarioTabla} where id=@Id`
        responsetype= await UsuarioHelper({id},query2);
        console.log(responsetype.recordset[0].tipo)
        if(responsetype.recordset[0].tipo==true){
            response= await AlumnoHelper({Alumno}, query);
            console.log(response)
            return response.recordset;
        }else{
            return "Fallo";
        }
    }
    
    updateAlumnoById = async (id, Alumno) => {
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
            query+=` WHERE id=@Id`
            response=await AlumnoHelper({id, Alumno}, query);
            console.log(response)
            return response.recordset;
        }
    }

    deleteAlumnoById = async (id) => {
        console.log('Delete Alumno by Id in Alumno Service');
        let response;
        let query=`DELETE FROM ${AlumnoTabla} WHERE id = @id`;
        response=await AlumnoHelper(undefined, query);
        console.log(response)
        return response.recordset;
    }
}