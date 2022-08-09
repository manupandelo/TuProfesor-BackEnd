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
        let Usuarios;
        connection.query(query, function (err, result, fields) {
              if (err) throw err;
              console.log(result);
              return result;
        });
        console.log(Usuarios);
        return Usuarios;
    }

    getUsuarioById = async (id) => {
        console.log('Get Usuario by its ID in Usuario Service');
        let query=`SELECT email, password, TipoUsuario.nombre as Tipo from Usuario JOIN TipoUsuario on Usuario.tipo = TipoUsuario.id where Usuario.id = ?`
        let Usuario;
        connection.query(query,[id], function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            Usuario = result;
        });
        return Usuario;
    }

    LogIn = async (Usuario)=> {
        console.log("Mail: " + Usuario.email);
        console.log("Password: " + Usuario.password);
        let query=`Select * from Usuario where email=?`;
        connection.query(query,[Usuario.email], function (err, result, fields) {
            if (err) throw err;
            if(result[0]==undefined){
                return "Email incorrecto"
            }
            if(bcrypt.compareSync(Usuario.password, result[0].password)){
                console.log("true")
                result[0].token=tokenService.getToken(result[0]);
                console.log(result[0])
                return result;
            }else{
                console.log("false")
                return "Error, reintentar";
            }
        });
    }

    createUsuario = async (Usuario) => {
        console.log('Create New Usuario in Usuario Service');
        
        let exists;
        let query2=`select * from Usuario where email=?`
        connection.query(query2,[Usuario.email], function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            exists=result;
        });//exists=await UsuarioHelper({Usuario}, query2);
        if(exists[0]==(undefined||null||NaN)){
            Usuario.password = await bcrypt.hash(Usuario.password, 10);
            console.log(Usuario.password);
            let query=`INSERT INTO Usuario(email, password, tipo) VALUES (?, ?, ?)`;
            connection.query(query,[Usuario.email,Usuario.password,Usuario.tipo], function (err, result, fields) {
                if (err) throw err;
                console.log('Affected rows:' + result.affectedRows);
                console.log(result);
                return result;
            });//response=await UsuarioHelper({Usuario}, query)
        }else{
            return "Usuario ya existente"
        }
        
    }

    updateUsuarioById = async (id, Usuario) => {
        console.log('Update Usuario by ID in Usuario Service');
        
        let count=0;
        let values;
        let comma=false
        let query=`UPDATE Usuario SET `;
        if(Usuario.email){
            query+=` email=${Usuario.email}`
            comma=true;
            count++;
        }if(Usuario.password){
            Usuario.password=await bcrypt.hash(Usuario.password, 10);
            count++;
            if(comma==true){
                query+=`, password=${Usuario.password}`
            }else{
                query+=` password=${Usuario.password}`
                comma=true;
            }
        }
        if(count==0){return "Nada que cambiar"}
        else{
        query+=` where id=${id}`;
        console.log(query);
        connection.query(query,[], function (err, result, fields) {
              if (err) throw err;
              console.log('affected rows: ' + result.affectedRows);
              return result;
        });//response=await UsuarioHelper({id, Usuario}, query);
        }
    }

    deleteUsuarioById = async (id) => {
        console.log('Delete Usuario by ID in Usuario Service');
        let query=`DELETE FROM Usuario WHERE id = ?`;
        connection.query(query,[id], function (err, result, fields) {
              if (err) throw err;
              console.log('affected rows:' + result.affectedRows);
              return;
            });//response = await UsuarioHelper(undefined, query);
    }
}