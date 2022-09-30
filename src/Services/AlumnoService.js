import 'dotenv/config'
import { TokenService } from './TokenService.js';
import bcrypt from 'bcryptjs';
import con from '../../db.js'

const tokenService = new TokenService();
const connection = con

export class AlumnoService {
    getAlumno = async () => {
        try {
            console.log('Get All Alumnos in Alumno Service');
            let query=`SELECT * from Alumno`
            const [result,fields] = await connection.execute(query);
            console.log(result);
            return result;
        }
        catch (error) {
            return (error);
        }
    }

    getAlumnoById = async (id) => {
        try{
            console.log('Get Alumno By Id in Alumno Service');
            let query=`SELECT * from Alumno where id = ?`
            const [result,fields] = await connection.execute(query,[id]);
            console.log(result);
            return result;
        }
        catch(error){
            return error
        }

    }

    getPeticionByUserId = async (id) => {
       try{
        console.log('Get Peticion by the User Id');
        let query=`SELECT Peticion.id, Peticion.Horario, Peticion.Estado, Profesor.nombre, Profesor.apellido join Profesor on Peticion.idProfesor=Profesor.id from Peticion where idAlumno = ?`
        const [result,fields] = await connection.execute(query,[id]);
        console.log(result);
        return result;
       }
       catch(error){
        return error;
       }
    }

    getReviewByUserId = async (id) => {
        try{
            console.log('Get Peticion by the User Id');
            let query=`SELECT * from Review where idAlumno = ?`
            const [result,fields] = await connection.execute(query,[id]);
            console.log(result);
            return result;
        }
        catch(error){
            return error;
        }
    }

    createAlumno = async (Alumno) => {
        try{
            console.log('Create New Alumno in Alumno Service');
            let query=`INSERT INTO Alumno(ubicacion, nombre, apellido, email, password, telefono) VALUES (?, ?, ?, ?, ?, ?)`
            let query2=`select * from Alumno where email=?`
            const [responsetype,fields] = await connection.execute(query2,[Alumno.email]);
            console.log(responsetype[0])
            if(responsetype[0]!=undefined){
                return "Fallo";
            }else{
                Alumno.password = await bcrypt.hash(Alumno.password, 10);
                const [result,fields] = await connection.execute(query,[Alumno.ubicacion, Alumno.nombre, Alumno.apellido, Alumno.email, Alumno.password, Alumno.telefono]);
                console.log("Row affected: " + result.rowsAffected);
                console.log(result);
                return result;
            }
        }
        catch(error){
            return error
        }
    }
    
    updateAlumnoById = async (id, Alumno) => {
        try{
            console.log('Update Alumno by Id in Alumno Service');
            console.log(id, Alumno)
            let count=0;
            let comma=false
            let query=`UPDATE Alumno SET`;
            if(Alumno.ubicacion){            
                query+=` ubicacion=?`
                comma=true;
                count++;
            }
            if(Alumno.email){
                if(comma==true){
                    query+=`, email=?`
                    values.push(Alumno.email);
                }else{
                    query+=` email=?`
                    comma=true;
                    values.push(Alumno.email);
                }
                count++
            }
            if(Alumno.password){
                if(comma==true){
                    query+=`, password=?`
                    values.push(Alumno.ubicacion);
                }else{
                    query+=` password=?`
                    comma=true;
                    values.push(Alumno.password);
                }
                Alumno.password = await bcrypt.hash(Alumno.password, 10);
                count++
            }
            // dejo por el dia en el que haya que meter mas datos
            if(count==0){return "Nada que cambiar"}
            else{
                query+=` WHERE id=?`
                const [result,fields] = await connection.execute(query,[Alumno.ubicacion,id]);
                console.log("Row affected: " + result.rowsAffected);
                console.log(result);
                return result;
            }
        }   
        catch(error){
            return error;
        }     
    }

    deleteAlumnoById = async (id) => {
        try{
            console.log('Delete Alumno by Id in Alumno Service');
            let query=`DELETE FROM Alumno WHERE id = ?`;
            const [result,fields] = await connection.execute(query,[id]);
            console.log("Row affected: " + result.rowsAffected);
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
            let query=`Select * from Alumno where email=?`;
            const [result,fields] = await connection.execute(query,[Usuario.email]);
            console.log(result);
            if(result[0]==undefined){
                return false
            }
            if(bcrypt.compareSync(Usuario.password, result[0].password)){
                console.log("true")
                result[0].token= await tokenService.getToken(result[0]);
                console.log(result[0])
                return result;
            }else{
                console.log("false")
                return false;
            }
        }
        catch(error){
            return error
        }
    }
}