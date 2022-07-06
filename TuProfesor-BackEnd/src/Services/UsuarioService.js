import UsuarioHelper from '../Helpers/UsuarioHelper.js'
import 'dotenv/config'
import { TokenService } from './TokenService.js';
import bcrypt from 'bcryptjs';

const UsuarioTabla = process.env.DB_TABLA_Usuario;
const TipoClaseTabla = process.env.DB_TABLA_Tipo_Clase;
const tokenService = new TokenService();

export class UsuarioService {

    getUsuario = async (Usuario) => {
        console.log('Get all Usuarios by user preferences in Usuario Service');
        let response;
        let query=`SELECT dsitinct email, password, TipoClase.nombre, tipo from ${UsuarioTabla} inner join ${TipoClaseTabla} on ${UsuarioTabla}.tipo = ${TipoClaseTabla}.id`; 
        response=await UsuarioHelper({Usuario}, query);
        console.log(response)
        return response.recordset;
    }

    getUsuarioById = async (id) => {
        console.log('Get Usuario by its ID in Usuario Service');
        let query1=`SELECT email, password, TipoClase.nombre, tipo from ${UsuarioTabla} inner join ${TipoClaseTabla} on ${UsuarioTabla}.tipo = ${TipoClaseTabla}.id where id = @id`
        let Usuario =await UsuarioHelper({id}, query1);
        return Usuario.recordset;
    }

    LogIn = async (Usuario)=> {
        let response;
        let query=`Select * from ${UsuarioTabla} where email=@Email`;
        response=await UsuarioHelper({Usuario}, query);
        console.log(response);
        if(response.recordset[0]==undefined){
            return "Email incorrecto"
        }
        if(bcrypt.compareSync(Usuario.password, response.recordset[0].password)){
            console.log("true")
            return tokenService.getToken(response.recordset);

        }else{
            console.log("false")
            return "Error, reintentar";
        }
    }

    createUsuario = async (Usuario) => {
        console.log('Create New Usuario in Usuario Service');
        let response;
        let exists;
        let query2=`select * from ${UsuarioTabla} where email=@Email`
        exists=await UsuarioHelper({Usuario}, query2);
        if(exists.recordset[0]==undefined){
            Usuario.password = await bcrypt.hash(Usuario.password, 10);
            console.log(Usuario.password);
            let query=`INSERT INTO ${UsuarioTabla}(email, password, tipo) VALUES (@Email, @Password, @Tipo)`;
            response=await UsuarioHelper({Usuario}, query)
            console.log(response)
            return response.recordset;
        }else{
            return "Usuario ya existente"
        }
        
    }

    updateUsuarioById = async (id, Usuario) => {
        console.log('Update Usuario by ID in Usuario Service');
        let response;
        let count=0;
        let comma=false
        let query=`UPDATE ${UsuarioTabla} SET `;
        if(Usuario.email){
            query+=` email=@Email`
            comma=true;
            count++;
        }if(Usuario.password){
            Usuario.password=await bcrypt.hash(Usuario.password, 10);
            count++;
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
        query+=` where id=@Id`;
        response=await UsuarioHelper({id, Usuario}, query);
        console.log(Usuario)
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