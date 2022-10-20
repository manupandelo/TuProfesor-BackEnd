import 'dotenv/config'
import con from '../../db.js'
const connection = con

export class PeticionService {

    getPeticion = async () => {
        try{
            console.log('Get All Peticiones');
            let query=`SELECT * from Peticion`
            const [result,fields] = await connection.execute(query);
            console.log(result);
            return result;
        }   
        catch(error){
            return error;
        }   
    }

    getPeticionById = async (id) => {
        try{
            console.log('Get Peticion by its ID');
            let query=`SELECT Peticion.idPeticion, Profesor.nombre, Profesor.apellido, Peticion.horario, Alumno.nombre as anombre, Peticion.descripcion, Peticion.horario, Peticion.Estado from Peticion inner join Alumno on Peticion.idAlumno=Alumno.id inner join Profesor on Peticion.idProfesor=Profesor.id where idPeticion = ?`;
            const [result,fields] = await connection.execute(query,[id]);
            console.log(result);
            return result;
        }   
        catch(error){
            return error;
        }   
    }

    createPeticion = async (Peticion) => {
        try{
            console.log('create Peticion in Peticion Service');
            console.log(Peticion);
            let query=`INSERT INTO Peticion(idAlumno, idProfesor, descripcion, horario, estado) VALUES (?,?,?,?,1)`
            const [result,fields] = await connection.execute(query,[Peticion.idAlumno, Peticion.idProfesor, Peticion.detalles, Peticion.horario]);
            console.log("Row affected: " + result.rowsAffected);
            console.log(result);
            return result;
        }   
        catch(error){
            return error;
        }   
    }

    updatePeticionById = async (id, Peticion) => {
        try{
            console.log('Update Peticion by Id in Peticion Service');
            console.log(id, Peticion)
            let variables=[];
            let query=`update Peticion SET`;
            let count=0;
            let comma
            if(Peticion.estado){
                query+=` Estado=?`
                variables.push(Peticion.estado)
                comma=true;
                count++;
            }
            /*if(Peticion.horario){
                if(Peticion.horario>24 || Peticion.horario<1){
                    return "Error cargando horario"
                }
                else{
                    if(comma==true){
                        query+=`, horario=?`
                    }
                    else{
                        query+=` horario=?`
                        comma=true
                    }
                    variables.push(Peticion.horario)
                    count++;
                }
            }
            if(!Peticion.estado){
                if(comma==true){
                    query+=`, Estado=?`
                }
                else{
                    query+=` Estado=?`
                    comma=true
                }
                variables.push(Peticion.estado)
                count++;
            }*/
            if(count==0){
                return "nada q cambiar"
            }
            
            const [result,fields] = await connection.execute(query,variables);
            console.log("Rows affected: " + result.rowsAffected);
            console.log(result);
            return result;
        }   
        catch(error){
            return error;
        }   
    }

    deletePeticionById = async (id) => {
        try{
            console.log('Delete peticion by id in Peticion service');
        
            let query=`DELETE FROM Peticion WHERE idPeticion = ?`;
            const [result,fields] = await connection.execute(query,[id]);
            console.log("Rows affected: " + result.rowsAffected);
            console.log(result);    
            return result;
        }   
        catch(error){
            return error;
        }   
    }
}
