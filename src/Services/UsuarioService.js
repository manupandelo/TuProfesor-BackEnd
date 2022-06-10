import 'dotenv/config'
import UsuarioHelper from '../Helpers/PeticionHelper.js'
import peticionHelper from '../Helpers/PeticionHelper.js'
import ReviewHelper from '../Helpers/ReviewHelper.js'

const ReviewTabla = process.env.DB_TABLA_Review;
const PeticionTabla = process.env.DB_TABLA_Peticion;
const UsuarioTabla = process.env.DB_TABLA_Usuario;

export class UsuarioService {

    getUsuario = async (filtros) => {
        console.log('Get All Usuarios in Usuario Service');
        let response;
        let query=`SELECT * from ${UsuarioTabla}`
        response=UsuarioHelper(undefined,query);
        console.log(response)
        return response.recordset;
    }

    getUsuarioById = async (id) => {
        console.log('Get Usuario By Id in Usuario Service');
        let response;
        let query=`SELECT * from ${UsuarioTabla} where id = @id`
        response=UsuarioHelper({id},query);
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

    createUsuario = async (Usuario) => {
        console.log('Create New Usuario in Usuario Service');
        //Ver bien como hacer que se inserten todas las variables y que no esten en null
        let response;
        let query=`INSERT INTO ${UsuarioTabla}(email, password, ubicacion, nombre, apellido) VALUES (@Email, @Password, @Ubicacion, @Nombre, @Apellido)`
        response=UsuarioHelper({Usuario}, query);
        console.log(response)
        return response.recordset;
    }
    
    updateUsuarioById = async (id, Usuario) => {
        //ver encriptacion para claves y/o emails
        console.log('Update Usuario by Id in Usuario Service');
        console.log(id, Usuario)
        let response;
        let count=0;
        let comma=false
        let query=`UPDATE ${UsuarioTabla} SET`;
        if(Usuario.email){
            query+=` email=@Email`
            comma=true;
            count++;
        }if(Usuario.password){
            if(comma==true){
                query+=`, password=@Password`
            }else{
                query=` password=@Password`
                comma=true;
            }
            count++;
        }if(Usuario.ubicacion){
            if(comma==true){
                query+=`, ubicacion=@Ubicacion`
            }else{
                query=` ubicacion=@Ubicacion`
                comma=true;
            }
            count++;
        }
        if(count==0){return "Nada que cambiar"}
        else{
            response=UsuarioHelper({id, Usuario}, query);
            console.log(response)
            return response.recordset;
        }
    }

    deleteUsuarioById = async (id) => {
        console.log('Delete Usuario by Id in Usuario Service');
        let response;
        let query=`DELETE FROM ${UsuarioTabla} WHERE id = @id`;
        response=UsuarioHelper(undefined, query);
        console.log(response)
        return response.recordset;
    }
}