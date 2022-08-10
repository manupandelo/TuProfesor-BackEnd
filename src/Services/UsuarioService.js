import 'dotenv/config'
import { TokenService } from './TokenService.js';
import bcrypt from 'bcryptjs';
import connection from '../../db.js'
import { response } from 'express';

const tokenService = new TokenService();

export class UsuarioService {
    
    getUsuario = async () => {
        console.log('Get all Usuarios in Usuario Service');
        let query="SELECT * FROM Usuario";
        const [result,fields] = await connection.execute(query);
        console.log(result);
        return result;
    }

    getUsuarioById = async (id) => {
        console.log('Get Usuario by its ID in Usuario Service');
        let query=`SELECT email, password, TipoUsuario.nombre as Tipo from Usuario JOIN TipoUsuario on Usuario.tipo = TipoUsuario.id where Usuario.id = ?`
        const [result,fields] = await connection.execute(query,[id]);
        console.log(result);
        return result;
    }

    LogIn = async (Usuario)=> {
        console.log("Mail: " + Usuario.email);
        console.log("Password: " + Usuario.password);
        let query=`Select * from Usuario where email=?`;
        const [result,fields] = await connection.execute(query,[Usuario.email]);
        console.log(result);
        if(result[0]==undefined){
            return "Email incorrecto"
        }
        if(bcrypt.compareSync(Usuario.password, result[0].password)){
            console.log("true")
            result[0].token= await tokenService.getToken(result[0]);
            console.log(result[0])
            return result;
        }else{
            console.log("false")
            return "Error, reintentar";
        }
    }

    createUsuario = async (Usuario) => {
        console.log('Create New Usuario in Usuario Service');
        let query2=`select * from Usuario where email=?`
        const [exists,fields1] = await connection.execute(query2,[Usuario.email]);
        console.log(exists.length);
        console.log(exists);
        //exists=await UsuarioHelper({Usuario}, query2);
        if(exists.length==0){
            Usuario.password = await bcrypt.hash(Usuario.password, 10);
            console.log(Usuario.password);
            let query=`INSERT INTO Usuario(email, password, tipo) VALUES (?, ?, ?)`;
            const [result,fields] = await connection.execute(query,[Usuario.email,Usuario.password,Usuario.tipo]);
            console.log('Affected rows:' + result.affectedRows);
            console.log(result);
            return result;//response=await UsuarioHelper({Usuario}, query)
        }else{
            return "Usuario ya existente"
        }
        
    }

    updateUsuarioById = async (id, Usuario) => {
        console.log('Update Usuario by ID in Usuario Service');
        let query;
        let values=[];
        if(!Usuario.email){
            if(!Usuario.password){
                return "Nada que cambiar";
            }
            else{
                Usuario.password = await bcrypt.hash(Usuario.password, 10);
                query=`UPDATE Usuario SET password=? WHERE id=?`;
                values=[Usuario.password,id];
            }
        }
        else{
            if(!Usuario.password){
                query=`UPDATE Usuario SET email=? WHERE id=?`;
                values=[Usuario.email,id];
            }
            else{
                Usuario.password = await bcrypt.hash(Usuario.password, 10);
                query=`UPDATE Usuario SET email=?, password=? WHERE id=?`;
                values=[Usuario.email,Usuario.password,id];
            }

        }
        const [result,fields] = await connection.execute(query,values);
        console.log('affected rows: ' + result.affectedRows);
        return result;//response=await UsuarioHelper({id, Usuario}, query);
    }

    deleteUsuarioById = async (id) => {
        console.log('Delete Usuario by ID in Usuario Service');
        let query=`DELETE FROM Usuario WHERE id = ?`;
        const [result,fields] = await connection.execute(query,[id]);
        console.log('affected rows:' + result.affectedRows);
        return result;//response = await UsuarioHelper(undefined, query);
    }
}