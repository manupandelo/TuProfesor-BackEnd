import 'dotenv/config'
import connection from '../../db.js'

export class AlumnoService {

    getAlumno = async () => {
        console.log('Get All Alumnos in Alumno Service');
        let query=`SELECT * from Alumno`
        const [result,fields] = await connection.execute(query);
        console.log(result);
        return result;
    }

    getAlumnoById = async (id) => {
        console.log('Get Alumno By Id in Alumno Service');
        
        let query=`SELECT * from Alumno where id = ?`
        const [result,fields] = await connection.execute(query,[id]);
        console.log(result);
        return result;
    }

    getPeticionByUserId = async (id) => {
        console.log('Get Peticion by the User Id');
        
        let query=`SELECT * from Peticion where idAlumno = ?`
        const [result,fields] = await connection.execute(query,[id]);
        console.log(result);
        return result;
    }

    getReviewByUserId = async (id) => {
        console.log('Get Peticion by the User Id');
        let query=`SELECT * from Review where idAlumno = ?`
        const [result,fields] = await connection.execute(query,[id]);
        console.log(result);
        return result;
    }

    createAlumno = async (Alumno) => {
        console.log('Create New Alumno in Alumno Service');
        let id=Alumno.idUser;
        let query=`INSERT INTO Alumno(ubicacion, nombre, apellido, idUser) VALUES (?, ?, ?, ?)`
        let query2=`select * from Usuario where id=?`
        const [responsetype,fields] = await connection.execute(query2,[id]);
        console.log(responsetype.recordset[0].tipo)
        if(responsetype.recordset[0].tipo==true){
            const [result,fields] = await connection.execute(query,[Alumno.ubicacion, Alumno.nombre, Alumno.apellido, id]);
            console.log("Row affected: " + result.rowsAffected);
            console.log(result);
            return result;
        }else{
            return "Fallo";
        }
    }
    
    updateAlumnoById = async (id, Alumno) => {
        console.log('Update Alumno by Id in Alumno Service');
        console.log(id, Alumno)
        let count=0;
        let comma=false
        let query=`UPDATE Alumno SET`;
        if(Alumno.ubicacion){            
            query+=` ubicacion=?`
            comma=true;
            count++;
        }// dejo por el dia en el que haya que meter mas datos
        if(count==0){return "Nada que cambiar"}
        else{
            query+=` WHERE id=?`
            const [result,fields] = await connection.execute(query,[Alumno.ubicacion,id]);
            console.log("Row affected: " + result.rowsAffected);
            console.log(result);
            return result;
        }
    }

    deleteAlumnoById = async (id) => {
        console.log('Delete Alumno by Id in Alumno Service');
        let query=`DELETE FROM Alumno WHERE id = ?`;
        const [result,fields] = await connection.execute(query,[id]);
        console.log("Row affected: " + result.rowsAffected);
        console.log(result);
        return result;
    }
}