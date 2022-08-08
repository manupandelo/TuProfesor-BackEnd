import 'dotenv/config'
import config from '../../db.js'

export class ProfesorService {

    getProfesor = async (ubicacion, materia, tipo, activo) => {
        console.log('Get all Profesores by user preferences in Profesor Service');
        let query=`SELECT nombre, apellido, ubicacion, tipo from Profesor inner join MateriaXProfesor on Profesor.id = MateriaXProfesor.idProfesor inner join Materia on MateriaXProfesor.idMateria=Materia.id  `; 
        let where=false
        let agregar=''

        if(materia){
            where = true;
            agregar+=` Materia.nombre=?`
        }if(ubicacion){
            if(where){
                agregar+=` and ubicacion=?`;
            }else{
                where=true
                agregar+=` ubicacion=? `
            }
        }if(tipo){
            if(where){
                agregar+=` and tipo=?`;
            }else{
                where=true
                agregar+=` tipo=? `
            }
        }if(activo){
            if(where){
                agregar+=` and activo=?`
            }
            else{
                where=true
                agregar+=` activo=? `
            }
        }
        if(where){
            query+="WHERE " + agregar /*+ "order by (Select AVG())"*/
        }//ARREGLAR PORFA

        connection.query(query,[/*aca las variables*/], function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            return result;
          });
    }

    getProfesorById = async (id) => {
        console.log('Get Profesor by its ID in Profesor Service');
        let query=`SELECT nombre, apellido, disponibilidad, ubicacion, tipo from Profesor where id = ?`
        let query2=`SELECT * from Review where idProfesor = ?`
        connection.query(query,[id], function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            return result;
        });
        //fijarse para agregar reviews
    }

    getPeticionByTeacherId = async (id) => {
        console.log('Get Peticion by the Teacher ID');
        let query=`SELECT * from Peticion where idProfesor = ?`;
        connection.query(query,[id], function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            return result;
        });
    }

    createProfesor = async (Profesor) => {
        console.log('Create New Profesor in Profesor Service');
        const id=Profesor.idUser
        let responsetype;
        let query=`INSERT INTO Profesor(nombre, apellido, borndate, ubicacion, telefono, activo, disponibilidad, tipo, idUser) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        let query2=`select * from Usuario where id=?`
        connection.query(query,[id], function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            responsetype=result;
        });
        
        console.log(responsetype)//responsetype=await UsuarioHelper({id},query2)
        console.log(responsetype[0].tipo)
        if(responsetype[0].tipo==true){
            connection.query(query,[Profesor.nombre, Profesor.apellido, Profesor.borndate, Profesor.ubicacion, Profesor.telefono, Profesor.activo, Profesor.disponibilidad, Profesor.tipo, Profesor.idUser], function (err, result, fields) {
                if (err) throw err;
                console.log('affected rows: ' + result.affectedRows);
                console.log(result);
                return result;
            });
        }
        else{
            return "Fallo";
        }
    }

    updateProfesorById = async (id, Profesor) => {
        console.log('Update Profesor by ID in Profesor Service');
        let count=0;
        let comma=false
        let query=`UPDATE Profesor SET`;
        if(Profesor.telefono){
            query+=` telefono=?`
            comma=true;
            count++;
        }if(Profesor.ubicacion){
            if(comma==true){
                query+=`, ubicacion=?`
            }else{
                query+=` ubicacion=?`
                comma=true;
            }
            count++
        }if(Profesor.activo){
            if(comma==true){
                query+=`, activo=?`
            }else{
                query+=` activo=?`
                comma=true;
            }
            count++;
        }
        if(count==0){return "Nada que cambiar"}
        else{
            query+=`where id=?`;
            connection.query(query,[id], function (err, result, fields) {
                if (err) throw err;
                console.log('affected rows: ' + result.affectedRows);
                return
              });
        }
    }

    deleteProfesorById = async (id) => {
        console.log('Delete Profesor by ID in Profesor Service');
        let query=`DELETE FROM Profesor WHERE id=?`;
        connection.query(query,[id], function (err, result, fields) {
              if (err) throw err;
              console.log('affected rows: ' + result.affectedRows);
              console.log(result);
              return;
            });
    }
}