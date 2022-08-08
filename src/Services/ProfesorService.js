import 'dotenv/config'
import config from '../../db.js'

export class ProfesorService {

    getProfesor = async (ubicacion, materia, tipo, activo) => {
        console.log('Get all Profesores by user preferences in Profesor Service');
        let response;
        let query=`SELECT nombre, apellido, ubicacion, tipo from Profesor inner join MateriaXProfesor on Profesor.id = MateriaXProfesor.idProfesor inner join Materia on MateriaXProfesor.idMateria=Materia.id  `; 
        let where=false
        let agregar=''

        if(materia){
            where = true;
            agregar+=` Materia.nombre=@Materia`
        }if(ubicacion){
            if(where){
                agregar+=` and ubicacion=@Ubicacion`;
            }else{
                where=true
                agregar+=` ubicacion=@Ubicacion `
            }
        }if(tipo){
            if(where){
                agregar+=` and tipo=@TipoClase`;
            }else{
                where=true
                agregar+=` tipo=@TipoClase `
            }
        }if(activo){
            if(where){
                agregar+=` and activo=@Activo`
            }
            else{
                where=true
                agregar+=` activo=@Activo `
            }
        }
        if(where){
            query+="WHERE " + agregar /*+ "order by (Select AVG())"*/
        }//ARREGLAR PORFA

        //response=await ProfesorHelper({materia, activo, ubicacion, tipo}, query);
        console.log(response)
        return response.recordset;
    }

    getProfesorById = async (id) => {
        console.log('Get Profesor by its ID in Profesor Service');
        let query1=`SELECT nombre, apellido, disponibilidad, ubicacion, tipo from Profesor where id = @id`
        let query2=`SELECT * from Review where idProfesor = @id`
        connection.query(query,[id], function (err, result, fields) {
              if (err) throw err;
              console.log(result);
              response=result;
            });
        console.log(response)
        //fijarse para agregar reviews
        return response;
    }

    getPeticionByTeacherId = async (id) => {
        console.log('Get Peticion by the Teacher ID');
        let response;
        let query=`SELECT * from Peticion where idProfesor = @Id`;
        connection.query(query,[id], function (err, result, fields) {
              if (err) throw err;
              console.log(result);
              response=result;
            });
        
        console.log(response)

        return response;
    }

    createProfesor = async (Profesor) => {
        console.log('Create New Profesor in Profesor Service');
        const id=Profesor.idUser
        let response;
        let responsetype;
        let query=`INSERT INTO Profesor(nombre, apellido, borndate, ubicacion, telefono, activo, disponibilidad, tipo, idUser) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        let query2=`select * from Usuario where id=@Id`
        connection.query(query,[id], function (err, result, fields) {
              if (err) throw err;
              console.log(result);
              responsetype=result;
            });
        
        console.log(responsetype)//responsetype=await UsuarioHelper({id},query2)
        console.log(responsetype[0].tipo)
        if(responsetype[0].tipo==true){
            connection.connect(function(err) {
                if (err) throw err;
                connection.query(query,[Profesor.nombre, Profesor.apellido, Profesor.borndate, Profesor.ubicacion, Profesor.telefono, Profesor.activo, Profesor.disponibilidad, Profesor.tipo, Profesor.idUser], function (err, result, fields) {
                  if (err) throw err;
                  console.log(result);
                  response=result;
                });
            });
            connection.end();
            console.log(response)
    
            return response;//response=await ProfesorHelper({Profesor}, query)
            console.log(response)
            return response.recordset;
        }else{
            return "Fallo";
        }
    }

    updateProfesorById = async (id, Profesor) => {
        console.log('Update Profesor by ID in Profesor Service');
        let response;
        let count=0;
        let comma=false
        let query=`UPDATE Profesor SET`;
        if(Profesor.telefono){
            query+=` telefono=@Telefono`
            comma=true;
            count++;
        }if(Profesor.ubicacion){
            if(comma==true){
                query+=`, ubicacion=@Ubicacion`
            }else{
                query+=` ubicacion=@Ubicacion`
                comma=true;
            }
            count++
        }if(Profesor.activo){
            if(comma==true){
                query+=`, activo=@Activo`
            }else{
                query+=` activo=@Activo`
                comma=true;
            }
            count++;
        }
        if(count==0){return "Nada que cambiar"}
        else{
            query+=`where id=@Id`;
            console.log(query)
            //response=await ProfesorHelper({id, Profesor}, query);
            console.log(response)
        }
        return response.recordset;
    }

    deleteProfesorById = async (id) => {
        console.log('Delete Profesor by ID in Profesor Service');
        let response;
        let query=`DELETE FROM Profesor WHERE id = @Id`;
        connection.query(query,[id], function (err, result, fields) {
              if (err) throw err;
              console.log(result);
              response=result;
            });
        
        console.log(response)

        return response;
    }
}