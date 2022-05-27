import sql from 'mssql'
import config from '../../db.js'
import 'dotenv/config'

const UsuarioTabla = process.env.DB_TABLA_Usuario;

export class UsuarioService {

    getUsuario = async () => {
        console.log('Get All Usuarios in Usuario Service');
        let response;
        const pool = await sql.connect(config);
        response = await pool.request().query(`SELECT * from ${UsuarioTabla}`);
        console.log(response)
        return response.recordset;
    }

    getUsuarioById = async (id) => {
        console.log('Get Usuario By Id in Usuario Service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .query(`SELECT * from ${UsuarioTabla} where id = @id`);
        console.log(response)

        return response.recordset[0];
    }

    createUsuario = async (Usuario) => {
        console.log('Create New Usuario in Usuario Service');
        //Ver bien como hacer que se inserten todas las variables y que no esten en nill
        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('email',sql.VarChar, Usuario?.email ?? '')
            .input('password',sql.VarChar, Usuario?.password ?? '')
            .input('ubicacion',sql.VarChar, Usuario?.ubicacion ?? '')
            .input('nombre',sql.VarChar, Usuario?.nombre ?? '')
            .input('apellido',sql.VarChar, Usuario?.apellido ?? '')
            .query(`INSERT INTO ${UsuarioTabla}(email, password, ubicacion, nombre, apellido) VALUES (@email, @password, @ubicacion, @nombre, @apellido)`);
        console.log(response)

        return response.recordset;
    }
    
    updatePassword = async(id, newPassword, oldPassword) => {
        //Ver Encriptacion para claves
        let usuario=this.getUsuarioById(id);
        if(usuario.password==oldPassword){
            //poner el update de contraseña
        }
        else{
            console.log(error);
        }
    }

    updateUsuarioById = async (id, Usuario) => {
        //ver encriptacion para claves y/o emails
        console.log('Update Usuario by Id in Usuario Service');
        console.log(id, Usuario)
        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id', sql.Int, id ?? '')
            .input('Imagen', sql.VarChar, Usuario?.imagen ?? '')
            .input('Nombre', sql.VarChar, Usuario?.nombre ?? '')
            .input('Edad', sql.VarChar, Usuario?.edad ?? '')
            .input('Peso', sql.VarChar, Usuario?.peso ?? '')
            .input('Historia', sql.VarChar, Usuario?.historia ?? '')
            .query(`UPDATE ${UsuarioTabla} SET imagen = @Imagen, nombre = @Nombre, edad = @Edad, peso = @Peso, historia = @Historia WHERE id = @id`);
        console.log(response)

        return response.recordset;
    }

    deleteUsuarioById = async (id) => {
        console.log('Delete Usuario by Id in Usuario Service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .query(`DELETE FROM ${UsuarioTabla} WHERE id = @id`);
        console.log(response)

        return response.recordset;
    }
}