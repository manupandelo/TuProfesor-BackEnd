import 'dotenv/config'
import sql from 'mssql'
import config from '../../../TuProfesor-Backend/db.js'

const ProfesorTabla = process.env.DB_TABLA_Profesor;
const PeticionTabla = process.env.DB_TABLA_Peticion;
const UsuarioTabla = process.env.DB_TABLA_Usuario;

export class UsuarioService {

    getUsuario = async (filtros) => {
        console.log('Get All Usuarios in Usuario Service');
        let response;
        let query=`SELECT * from ${UsuarioTabla}`
        const pool = await sql.connect(config);
        response = await pool.request().query(query)
        console.log(response)
        return response.recordset;
    }

    getUsuarioById = async (id) => {
        console.log('Get Usuario By Id in Usuario Service');
        let response;
        let query=`SELECT * from ${UsuarioTabla} where id = @id`
        const pool = await sql.connect(config);
        response = await pool.request()
        .input('Id',sql.Int, id)
        .query(query);
        console.log(response)

        return response.recordset;
    }

    getPeticionByUserId = async (id) => {
        console.log('Get Peticion by the User Id');
        let response;
        let query=`SELECT * from ${PeticionTabla} where idAlumno = @id`
        const pool = await sql.connect(config);
        response = await pool.request()
        .input('Id',sql.Int, id)
        .query(query)
        console.log(response)

        return response.recordset;
    }

    createUsuario = async (Usuario) => {
        console.log('Create New Usuario in Usuario Service');
        //Ver bien como hacer que se inserten todas las variables y que no esten en null
        let response;
        let query=`INSERT INTO ${UsuarioTabla}(email, password, ubicacion, nombre, apellido) VALUES (@Email, @Password, @Ubicacion, @Nombre, @Apellido)`
        const pool = await sql.connect(config);
        response = await pool.request()
        .input('Nombre',sql.VarChar, Usuario?.nombre ?? '')
        .input('Apellido',sql.VarChar, Usuario?.apellido ?? '')
        .input('Ubicacion',sql.VarChar, Usuario?.ubicacion ?? '')
        .input('Email',sql.VarChar, Usuario?.email ?? '')
        .input('Password',sql.VarChar, Usuario?.password ?? '')
        .query(query);
        console.log(response)

        return response.recordset;
    }
    
    updateUsuarioById = async (id, Usuario) => {
        //ver encriptacion para claves y/o emails
        console.log('Update Usuario by Id in Usuario Service');
        console.log(id, Usuario)
        let response;
        let query=`UPDATE ${UsuarioTabla} SET apellido = @Apellido, nombre = @Nombre, ubicacion = @Ubicacion, email = @Email, password = @Password WHERE id = @id`;
        const pool = await sql.connect(config);
        response = await pool.request()
        .input('Id',sql.Int, id)
        .input('Nombre',sql.VarChar, Usuario?.nombre ?? '')
        .input('Apellido',sql.VarChar, Usuario?.apellido ?? '')
        .input('Ubicacion',sql.VarChar, Usuario?.ubicacion ?? '')
        .input('Email',sql.VarChar, Usuario?.email ?? '')
        .input('Password',sql.VarChar, Usuario?.password ?? '')
        .query(query);
        console.log(response)

        return response.recordset;
    }

    deleteUsuarioById = async (id) => {
        console.log('Delete Usuario by Id in Usuario Service');
        let response;
        let query=`DELETE FROM ${UsuarioTabla} WHERE id = @id`;
        const pool = await sql.connect(config);
        response = await pool.request()
        .input('Id',sql.Int, id)
        .query(query);
        console.log(response)

        return response.recordset;
    }
}