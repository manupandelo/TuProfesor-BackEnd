import 'dotenv/config'
import mysql from 'mysql'
import config from '../../db.js'

var connection = mysql.createConnection(config);
const Profesor = process.env.DB_TABLA_Profesor;
const PeticionTabla = process.env.DB_TABLA_Peticion;
const ReviewTabla = process.env.DB_TABLA_Review;
const IntermediaTabla= process.env.DB_TABLA_Intermedia;
const MateriaTabla= process.env.DB_TABLA_Materia;
const UsuarioTabla= process.env.DB_TABLA_Usuario;

export class ProfesorService {

    getProfesor = async (ubicacion, materia, tipo, activo) => {
        console.log('Get all Profesores by user preferences in Profesor Service');
        let response;
        let query=`SELECT nombre, apellido, ubicacion, tipo from Profesor inner join ${IntermediaTabla} on Profesor.id = ${IntermediaTabla}.idProfesor inner join ${MateriaTabla} on ${IntermediaTabla}.idMateria=${MateriaTabla}.id  `; 
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

        response=await ProfesorHelper({materia, activo, ubicacion, tipo}, query);
        console.log(response)
        return response.recordset;
    }

    getProfesorById = async (id) => {
        console.log('Get Profesor by its ID in Profesor Service');
        let query1=`SELECT nombre, apellido, disponibilidad, ubicacion, tipo from Profesor where id = @id`
        let query2=`SELECT * from Review where idProfesor = @id`
        let Profesor = ProfesorHelper({id}, query1);
        let Reviews =await ReviewHelper({id}, query2);
        console.log(Reviews)

        Profesor.recordset[0].Reviews=Reviews.recordset;
        return Profesor.recordset;
    }

    getPeticionByTeacherId = async (id) => {
        console.log('Get Peticion by the Teacher ID');
        let response;
        let query=`SELECT * from Peticion where idProfesor = @Id`;
        response=await peticionHelper({id}, query);
        console.log(response)

        return response.recordset;
    }

    createProfesor = async (Profesor) => {
        console.log('Create New Profesor in Profesor Service');
        const id=Profesor.idUser
        let response;
        let responsetype;
        let query=`INSERT INTO Profesor(nombre, apellido, borndate, ubicacion, telefono, activo, disponibilidad, tipo, idUser) VALUES (@Nombre, @Apellido, @Nacimiento, @Ubicacion, @Telefono, @Activo, @Disponibilidad, @TipoClase, @IdUser)`;
        let query2=`select * from Usuario where id=@Id`
        responsetype=await UsuarioHelper({id},query2)
        console.log(responsetype.recordset[0].tipo)
        if(responsetype.recordset[0].tipo==true){
            response=await ProfesorHelper({Profesor}, query)
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
            response=await ProfesorHelper({id, Profesor}, query);
            console.log(response)
        }
        return response.recordset;
    }

    deleteProfesorById = async (id) => {
        console.log('Delete Profesor by ID in Profesor Service');
        let response;
        let query=`DELETE FROM Profesor WHERE id = @Id`;
        response = await ProfesorHelper(undefined, query);
        console.log(response)

        return response.recordset;
    }
}