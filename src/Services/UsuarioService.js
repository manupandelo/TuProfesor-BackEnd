import 'dotenv/config'
import { TokenService } from './TokenService.js';
import bcrypt from 'bcryptjs';
import connection from '../../db.js'
import { response } from 'express';

const tokenService = new TokenService();

export class UsuarioService {
    
    getUsuario = async () => {
        console.log('Get all Usuarios in Usuario Service');
        let response;
        let query="SELECT * FROM Usuario";
        connection.connect(function(err) {
            if (err) throw err;
            connection.query(query, function (err, result, fields) {
              if (err) throw err;
              console.log(result);
              response=result;
            });
        });
        connection.end();
        return response;
    }

    getUsuarioById = async (id) => {
        console.log('Get Usuario by its ID in Usuario Service');
        let query=`SELECT email, password, TipoUsuario.nombre as Tipo from Usuario JOIN TipoClase on Usuario.tipo = TipoUsuario.id where id = ?`
        connection.connect(function(err) {
            if (err) throw err;
            connection.query(query,[id], function (err, result, fields) {
              if (err) throw err;
              console.log(result);
              response=result;
            });
        });
        connection.end();
        return response;
    }

    LogIn = async (Usuario)=> {
        let response;
        let query=`Select * from Usuario where email=@Email`;
        connection.connect(function(err) {
            if (err) throw err;
            connection.query(query,[Usuario.email], function (err, result, fields) {
              if (err) throw err;
              console.log(result);
              response=result;
            });
        });
        connection.end();
        console.log(response);
        if(response[0]==undefined){
            return "Email incorrecto"
        }
        if(bcrypt.compareSync(Usuario.password, response[0].password)){
            console.log("true")
            response[0].token=tokenService.getToken(response.recordset[0]);
            return response;
        }else{
            console.log("false")
            return "Error, reintentar";
        }
    }

    createUsuario = async (Usuario) => {
        console.log('Create New Usuario in Usuario Service');
        let response;
        let exists;
        let query2=`select * from Usuario where email=?`
        connection.connect(function(err) {
            if (err) throw err;
            connection.query(query2,[Usuario.email], function (err, result, fields) {
              if (err) throw err;
              console.log(result);
              exists=result;
            });
        });
        connection.end();//exists=await UsuarioHelper({Usuario}, query2);
        if(exists.recordset[0]==(undefined||null||NaN)){
            Usuario.password = await bcrypt.hash(Usuario.password, 10);
            console.log(Usuario.password);
            let query=`INSERT INTO Usuario(email, password, tipo) VALUES (?, ?, ?)`;
            connection.connect(function(err) {
                if (err) throw err;
                connection.query(query,[Usuario.email,Usuario.password,Usuario.tipo], function (err, result, fields) {
                  if (err) throw err;
                  console.log('Affected rows:' + result.affectedRows);
                  console.log(result);
                  response=result;
                });
            });
            connection.end();//response=await UsuarioHelper({Usuario}, query)
            console.log(response)
            return response;
        }else{
            return "Usuario ya existente"
        }
        
    }

    updateUsuarioById = async (id, Usuario) => {
        console.log('Update Usuario by ID in Usuario Service');
        let response;
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
        connection.connect(function(err) {
            if (err) throw err;
            connection.query(query,[], function (err, result, fields) {
              if (err) throw err;
              console.log('affected rows: ' + result.affectedRows);
              response=result;
            });
        });
        connection.end();//response=await UsuarioHelper({id, Usuario}, query);
        console.log(Usuario)
        console.log(response)
        }
        return response;
    }

    deleteUsuarioById = async (id) => {
        console.log('Delete Usuario by ID in Usuario Service');
        let response;
        let query=`DELETE FROM Usuario WHERE id = @Id`;
        connection.connect(function(err) {
            if (err) throw err;
            connection.query(query,[], function (err, result, fields) {
              if (err) throw err;
              console.log('affected rows:' + result.affectedRows);
            });
        });
        connection.end();//response = await UsuarioHelper(undefined, query);
    }
}