import 'dotenv/config'
import sql from 'mssql'
import config from '../../../TuProfesor-Backend/db.js'

const ProfesorTabla = process.env.DB_TABLA_Profesor;
const PeticionTabla = process.env.DB_TABLA_Peticion;
const UsuarioTabla = process.env.DB_TABLA_Usuario;

export class PeticionService {

    getPeticion = async () => {
        console.log('Get All Peticiones');
        let response;
        let query=`SELECT * from ${PeticionTabla}`
        const pool = await sql.connect(config);
        response = await pool.request().query(query)
        console.log(response)
        return response.recordset;
    }

    getPeticionById = async (id) => {
        console.log('Get Peticion by its ID');
        let response;
        let query=`SELECT * from ${PeticionTabla} where idPeticion = @id`;
        const pool = await sql.connect(config);
        response = await pool.request()
        .input('Id',sql.Int, id)
        .query(query);
        console.log(response)

        return response.recordset;
    }

    createPeticion = async (Peticion) => {
        console.log('create Peticion in Peticion Service');
        let response;
        let query=`INSERT INTO ${PeticionTabla}(idAlumno, idProfesor, detalles, horario) VALUES (@IdAlumno, @IdProfesor, @Detalles, @Horario)`
        const pool = await sql.connect(config);
        response = await pool.request()
        .input('IdProfesor',sql.Int, Peticion?.idProfesor ?? 0)
        .input('IdAlumno',sql.Int, Peticion?.idAlumno ?? 0)
        .input('Detalles',sql.VarChar, Peticion?.detalles ?? '')
        .input('Horario',sql.DateTime, Peticion?.horario ?? '')
        .query(query);

        console.log(response)
        return response.recordset;
    }

    updatePeticionById = async (id, Peticion) => {
        console.log('Update Peticion by Id in Peticion Service');
        console.log(id, Peticion)
        let response;
        let query;
        if(!Peticion.detalles){
            if(!Peticion.horario){
               return "Nada que cambiar";
            }else{
                query=`update ${PeticionTabla} SET horario=@Horario where idPeticion=@Id`
            }
        }
        else{
            if(!Peticion.horario){
                query=`update ${PeticionTabla} SET detalles=@Detalles where idPeticion=@Id`
            }
            else{
                query=`UPDATE ${PeticionTabla} SET detalles=@Detalles, horario=@Horario WHERE idPeticion = @id`;
            }
        }
        const pool = await sql.connect(config);
        response = await pool.request()
        .input('Id',sql.Int, id)
        .input('IdAlumno',sql.Int, Peticion?.idProfesor ?? 0)
        .input('IdProfesor',sql.Int, Peticion?.idAlumno ?? 0)
        .input('Detalles',sql.VarChar, Peticion?.detalles ?? '')
        .input('TelefonoAlumno',sql.Int, Peticion?.telefonoalumno ?? 0)
        .input('Horario',sql.DateTime, Peticion?.horario ?? '')
        .query(query);
        console.log(response)

        return response.recordset;
    }

    deletePeticionById = async (id) => {
        console.log('Delete peticion by id in Peticion service');
        let response;
        let query=`DELETE FROM ${PeticionTabla} WHERE idPeticion = @id`;
        const pool = await sql.connect(config);
        response = await pool.request()
        .input('Id',sql.Int, id)
        .query(query)
        console.log(response)

        return response.recordset;
    }
}