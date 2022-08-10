import 'dotenv/config'
import connection from '../../db.js'

export class ProfesorService {

    getProfesor = async (ubicacion, materia, tipo, activo) => {
        console.log('Get all Profesores by user preferences in Profesor Service');
        let query=`SELECT nombre, apellido, ubicacion, tipo, activo from Profesor join MateriaXProfesor on Profesor.id = MateriaXProfesor.idProfesor join Materia on MateriaXProfesor.idMateria=Materia.id`; 
        let where=false
        let agregar=''
        let values=[];
        if(materia){
            where = true;
            agregar+=`Materia.nombre=?`
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
                agregar+=` and tipo=?`;
                values.push(tipo)
            }else{
                where=true
                agregar+=`tipo=? `
                values.push(tipo)
            }
        }if(activo){
            if(where){
                agregar+=` and activo=?`
                values.push(activo)
            }
            else{
                where=true
                agregar+=`activo=? `
            }
        }
        if(where){
            query+=" WHERE " + agregar /*+ "order by (Select AVG())"*/
        }//ARREGLAR PORFA, No funciona tipo, activo y materia 

        const [result,fields] = await connection.execute(query,values);
        console.log(result);
        return result;
    }

    getProfesorById = async (id) => {
        console.log('Get Profesor by its ID in Profesor Service');
        let query=`SELECT nombre, apellido, disponibilidad, ubicacion, tipo from Profesor where id = ?`
        let query2=`SELECT * from Review where idProfesor = ?`
        const [result,fields] = await connection.execute(query);
        console.log(result);
        const [result2,fields2] = await connection.execute(query2,[id]);
        result[0].reviews = result2;
        return result;
        //fijarse para agregar reviews
    }

    getPeticionByTeacherId = async (id) => {
        console.log('Get Peticion by the Teacher ID');
        let query=`SELECT * from Peticion where idProfesor = ?`;
        const [result,fields] = await connection.execute(query,[id]);
        console.log(result);
        return result;
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

    deleteProfesorById = async (id) => {
        console.log('Delete Profesor by ID in Profesor Service');
        let query=`DELETE FROM Profesor WHERE id=?`;
        const [result,fields] = await connection.execute(query,[id]);
        console.log("Rows affected: " + result.rowsAffected);
        console.log(result);
        return result;
    }
}