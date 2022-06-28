import UsuarioHelper from '../Helpers/UsuarioHelper.js'
import peticionHelper from '../Helpers/PeticionHelper.js'
import ReviewHelper from '../Helpers/ReviewHelper.js'
import 'dotenv/config'
import { TokenService } from './TokenService.js';

const UsuarioTabla = process.env.DB_TABLA_Usuario;
const TipoClaseTabla = process.env.DB_TABLA_Tipo_Clase;
const PeticionTabla = process.env.DB_TABLA_Peticion;
const ReviewTabla = process.env.DB_TABLA_Review;
const tokenService = new TokenService();

export class UsuarioService {

    getUsuario = async () => {
        console.log('Get all Usuarios by user preferences in Usuario Service');
        let response;
        let query=`SELECT email, password, TipoClase.nombre, tipo from ${UsuarioTabla} inner join ${TipoClaseTabla} on ${UsuarioTabla}.tipo = ${TipoClaseTabla}.id`; 
        response=await UsuarioHelper(undefined, query);
        console.log(response)
        return response.recordset;
    }

    getUsuarioById = async (id) => {
        console.log('Get Usuario by its ID in Usuario Service');
        let query1=`SELECT email, password, TipoClase.nombre, tipo from ${UsuarioTabla} inner join ${TipoClaseTabla} on ${UsuarioTabla}.tipo = ${TipoClaseTabla}.id where id = @id`
        let Usuario =await UsuarioHelper({id}, query1);
        return Usuario.recordset;
    }

    LogIn = async (log)=> {
        let response;
        let query=`Select email, password from ${UsuarioTabla} where email=@Email and password=@Password`;
        response=await UsuarioHelper({log}, query);
        console.log(response);
        if(response.data){
            return tokenService.getToken();
        }else{
            return "Error, reintentar";
        }
    }

    createUsuario = async (Usuario) => {
        console.log('Create New Usuario in Usuario Service');
        let response;
        let query=`INSERT INTO ${UsuarioTabla}(email, password, tipo) VALUES (@Email, @Password, @Tipo)`;
        response=UsuarioHelper({Usuario}, query)
        console.log(response)
        return response.recordset;
    }

    updateUsuarioById = async (id, Usuario) => {
        console.log('Update Usuario by ID in Usuario Service');
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
                query+=` password=@Password`
                comma=true;
            }
        }if(Usuario.tipo){
            if(comma==true){
                query+=`, tipo=@Tipo`
            }else{
                query+=` tipo=@Tipo`
                comma=true;
            }
            count++;
        }
        if(count==0){return "Nada que cambiar"}
        else{
        query+=`where id=@Id`;
        response=await UsuarioHelper({id, Usuario}, query);
        console.log(response)
        }
        return response.recordset;
    }

    deleteUsuarioById = async (id) => {
        console.log('Delete Usuario by ID in Usuario Service');
        let response;
        let query=`DELETE FROM ${UsuarioTabla} WHERE id = @Id`;
        response = await UsuarioHelper(undefined, query);
        console.log(response)

        return response.recordset;
    }
}