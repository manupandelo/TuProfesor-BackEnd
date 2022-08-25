import 'dotenv/config'
import { TokenService } from './TokenService.js';
import bcrypt from 'bcryptjs';
import connection from '../../db.js'

const tokenService = new TokenService();

export class ProfesorService {

    getMaterias = async() => {
        try{
            let query=`Select * From materia`
        const [result,fields] = await connection.execute(query);
        console.log(result);
        return result;
        }   
        catch(error){
            return error;
        }   
    }
    
    getProfesor = async (ubicacion, materia, tipo, activo) => {
        try{
            console.log('Get all Profesores by user preferences in Profesor Service');
            let query=`SELECT profesor.nombre, profesor.apellido, tipoClase.nombre as TipoClase, profesor.ubicacion  from profesor join tipoclase on profesor.tipo=tipoclase.idTipo`; 
            let where=false
            let agregar=''
            let before=''
            let values=[];
            if(materia){
                where = true;
                before+=`join materiaxprofesor on profesor.id = materiaxprofesor.idProfesor join materia on materiaxprofesor.idMateria=materia.id`
                agregar+=`materia.Materia=?`
                values.push(materia)
            }if(ubicacion){
                if(where){
                    agregar+=` and ubicacion=?`;
                    values.push(ubicacion)
                }else{
                    where=true
                    agregar+=`ubicacion=? `
                    values.push(ubicacion)
                }
            }if(tipo){
                if(where){
                    agregar+=` and tipoclase.nombre=?`;
                    values.push(tipo)
                }else{
                    where=true
                    agregar+=`tipoclase.nombre=? `
                    values.push(tipo)
                }
            }
            if(where){
                query+=before + " WHERE " + agregar 
            }
            console.log(query)
            const [result,fields] = await connection.execute(query,values);
            console.log(result);
            return result;
        }   
        catch(error){
            return error;
        }   
    }

    getProfesoresActivos = async() => {
        try{
            let query=`SELECT * from profesor where activo=1`; 
            const [result,fields] = await connection.execute(query);
            console.log(result);
            return result;
        }   
        catch(error){
            return error;
        }   
    }

    getProfesorById = async (id) => {
        try{
            console.log('Get Profesor by its ID in Profesor Service');
        let query=`Select * from profesor where id=?`
        let query2=`SELECT * from review where idProfesor = ?`
        let query3=`Select Materia from materia join materiaxprofesor on materia.id=materiaxprofesor.idMateria where materiaxprofesor.idProfesor = ?`
        const [result,fields] = await connection.execute(query,[id]);
        console.log(result);
        const [result2,fields2] = await connection.execute(query2,[id]);
        result[0].reviews = result2;
        const [result3,fields3] = await connection.execute(query3,[id]);
        result[0].materias = result3;
        console.log(result)
        return result;
        }   
        catch(error){
            return error;
        }   
        //fijarse para agregar reviews
    }

    getPeticionByTeacherId = async (id) => {
        try{
            console.log('Get Peticion by the Teacher ID');
            let query=`SELECT * from Peticion where idProfesor = ?`;
            const [result,fields] = await connection.execute(query,[id]);
            console.log(result);
            return result;
        }   
        catch(error){
            return error;
        }   
    }

    createProfesor = async (Profesor) => {
        console.log('Create New Profesor in Profesor Service');
        const id=Profesor.idUser;
        let query=`INSERT INTO Profesor(nombre, apellido, borndate, ubicacion, telefono, activo, disponibilidad, tipo, idUser) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        let query2=`select * from Usuario where id=?`
        const [responsetype,fields] = await connection.execute(query2,[id]);
        console.log(responsetype)//responsetype=await UsuarioHelper({id},query2)
        console.log(responsetype[0].tipo)
        if(responsetype[0].tipo==true){
            const [result,fields] = await connection.execute(query,[Profesor.nombre, Profesor.apellido, Profesor.borndate, Profesor.ubicacion, Profesor.telefono, Profesor.activo, Profesor.disponibilidad, Profesor.tipo, id]);
            console.log("Rows affected: " + result.rowsAffected);
            console.log(result);
            return result;
        }
        else{
            return "Fallo";
        }
    }

    updateProfesorById = async (id, Profesor) => {
        try{
            console.log('Update Profesor by ID in Profesor Service');
            let count=0;
            let comma=false
            let values=[];
            let query=`UPDATE Profesor SET`;
            if(Profesor.telefono){
                query+=` telefono=?`
                comma=true;
                count++;
                values.push(Profesor.telefono);
            }if(Profesor.ubicacion){
                if(comma==true){
                    query+=`, ubicacion=?`
                    values.push(Profesor.ubicacion);
                }else{
                    query+=` ubicacion=?`
                    comma=true;
                    values.push(Profesor.ubicacion);
                }
                count++
            }if(Profesor.activo){
                if(comma==true){
                    query+=`, activo=?`
                    values.push(Profesor.activo);
                }else{
                    query+=` activo=?`
                    comma=true;
                    values.push(Profesor.activo);
                }
                count++;
            }
            if(Profesor.email){
                if(comma==true){
                    query+=`, email=?`
                    values.push(Profesor.email);
                }else{
                    query+=` email=?`
                    comma=true;
                    values.push(Profesor.email);
                }
                count++;
            }
            if(Profesor.password){
                if(comma==true){
                    query+=`, password=?`
                    values.push(Profesor.password);
                }else{
                    query+=` password=?`
                    comma=true;
                    values.push(Profesor.password);
                }
                count++;
            }
            if(count==0){return "Nada que cambiar"}
            else{
                query+=` where id=?`;
                values.push(id);
                const [result,fields] = await connection.execute(query,values);
                console.log("Rowz affected: " + result.rowsAffected);
                console.log(result);
                return result;
            }
        }
        catch(error){
            return error
        }    
    }

    deleteProfesorById = async (id) => {
        try{
            console.log('Delete Profesor by ID in Profesor Service');
            let query=`DELETE FROM Profesor WHERE id=?`;
            const [result,fields] = await connection.execute(query,[id]);
            console.log("Rows affected: " + result.rowsAffected);
            console.log(result);
            return result;
        }
        catch(error){
            return error;
        }
    }

    login = async (Usuario) => {
        try{
            console.log("Mail: " + Usuario.email);
            console.log("Password: " + Usuario.password);
            let query=`Select * from Profesor where email=?`;
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
        catch(error){
            return error
        }
    }
}
