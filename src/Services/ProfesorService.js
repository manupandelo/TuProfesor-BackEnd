import sql from 'mssql'
import config from '../../db.js'
import 'dotenv/config'

const ProfesorTabla = process.env.DB_TABLA_Profesor;

export class ProfesorService {

    getProfesor = async (titulo, order) => {
        console.log('Get all Profesores by user preferences in Profesor Service');
        let response;
        const pool = await sql.connect(config);
        if(!titulo){
            if(order=="asc" || order=="desc"){
                 response = await pool.request().input('order',sql.Varchar, order).query(`SELECT * from ${ProfesorTabla} order by @order`);
                 
            }else{
                response = await pool.request().query(`SELECT * from ${UsuarioTabla}`);
            }
        }
        else{
            if(order=="asc" || order=="desc"){
                response = await pool.request()
                .input('titulo',sql.VarChar, titulo)
                .query(`SELECT * from ${ProfesorTabla} where titulo= @titulo order by @order`);
            }
            else{
                response = await pool.request()
                .input('nombre',sql.VarChar, nombre)
                .query(`SELECT * from ${ProfesorTabla} where titulo= @titulo`);
            }
        }
        console.log(response)
        return response.recordset;
    }

    getProfesorById = async (id) => {
        console.log('Get Profesor by its ID in Profesor Service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .query(`SELECT * from ${ProfesorTabla} where id = @id`
            );
        console.log(response)

        return response.recordset[0];
    }

    createProfesor = async (Profesor) => {
        console.log('Create New Profesor in Profesor Service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('nombre',sql.VarChar, Profesor?.titulo ?? '')
            .input('imagen',sql.VarChar, Profesor?.imagen ?? '')
            .input('fechacreacion',sql.Date, Profesor?.fechacreacion ?? 0)
            .query(`INSERT INTO ${ProfesorTabla}(nombre, imagen, fechacreacion, calificacion) VALUES (@nombre, @imagen, @fechacreacion, 0)`);
        console.log(response)

        return response.recordset;
    }

    updateProfesorById = async (id, Profesor) => {
        console.log('Update Profesor by ID in Profesor Service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .input('Nombre',sql.VarChar, Profesor?.nombre ?? '')
            .input('Imagen',sql.VarChar, Profesor?.imagen ?? '')
            .input('Calificacion' ,sql.Int, Profesor?.calificacion)
            .query(`UPDATE ${ProfesorTabla} SET titulo = @Nombre, imagen = @Imagen, calificacion = @Calificacion  WHERE id = @Id`);
        console.log(response)

        return response.recordset;
    }

    deleteProfesorById = async (id) => {
        console.log('Delete Profesor by ID in Profesor Service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .query(`DELETE FROM ${ProfesorTabla} WHERE id = @id`);
        console.log(response)

        return response.recordset;
    }
}