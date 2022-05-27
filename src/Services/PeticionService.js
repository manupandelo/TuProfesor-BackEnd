import sql from 'mssql'
import config from '../../db.js'
import 'dotenv/config'

const PeticionTabla = process.env.DB_TABLA_Peticion;

export class PeticionService {

    getPeticion = async () => {
        console.log('Get All Peticiones');
        let response;
        const pool = await sql.connect(config);
        response = await pool.request().query(`SELECT * from ${PeticionTabla}`);
        console.log(response)
        return response.recordset;
    }

    getPeticionById = async (id) => {
        console.log('Get Peticion by its ID');
        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .query(`SELECT * from ${PeticionTabla} where idPeticion = @id`);
        console.log(response)

        return response.recordset[0];
    }

    getPeticionByTeacherId = async (id) => {
        console.log('Get Peticion by the Teacher ID');
        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .query(`SELECT * from ${PeticionTabla} where idProfesor = @id`);
        console.log(response)

        return response.recordset[0];
    }

    getPeticionByUserId = async (id) => {
        console.log('Get Peticion by the User Id');
        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .query(`SELECT * from ${PeticionTabla} where idAlumno = @id`);
        console.log(response)

        return response.recordset[0];
    }

    createPeticion = async (Peticion) => {
        console.log('create Peticion in Peticion Service');
        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('nombre',sql.VarChar, Peticion?.nombre ?? '')
            .input('imagen',sql.VarChar, Peticion?.imagen ?? '')
            .input('edad',sql.Int, Peticion?.edad ?? 0)
            .input('peso',sql.Int, Peticion?.peso ?? 0)
            .input('historia',sql.VarChar, Peticion?.historia ?? '')
            .query(`INSERT INTO ${PeticionTabla}(nombre, imagen, edad, peso, historia) VALUES (@nombre, @imagen, @edad, @peso, @historia)`);
        console.log(response)

        return response.recordset;
    }

    updatePeticionById = async (id, Peticion) => {
        console.log('Update Peticion by Id in Peticion Service');
        console.log(id, Peticion)
        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id', sql.Int, id ?? '')
            .input('Imagen', sql.VarChar, Peticion?.imagen ?? '')
            .input('Nombre', sql.VarChar, Peticion?.nombre ?? '')
            .input('Edad', sql.VarChar, Peticion?.edad ?? '')
            .input('Peso', sql.VarChar, Peticion?.peso ?? '')
            .input('Historia', sql.VarChar, Peticion?.historia ?? '')
            .query(`UPDATE ${PeticionTabla} SET imagen = @Imagen, nombre = @Nombre, edad = @Edad, peso = @Peso, historia = @Historia WHERE id = @id`);
        console.log(response)

        return response.recordset.rowsAffected;
    }

    deletePeticionById = async (id) => {
        console.log('Delete peticion by id in Peticion service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .query(`DELETE FROM ${PeticionTabla} WHERE id = @id`);
        console.log(response)

        return response.recordset;
    }
}