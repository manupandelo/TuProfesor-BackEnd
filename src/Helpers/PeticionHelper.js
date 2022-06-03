import sql from 'mssql'
import config from './db.js'

const dbHelper = async (id, params, query) => {
    const pool = await sql.connect(config);
    const response = await pool.request()
    .input('Id',sql.Int, id)
    .input('IdAlumno',sql.Int, paramas?.idProfesor ?? 0)
    .input('IdProfesor',sql.Int, params?.idAlumno ?? 0)
    .input('Detalles',sql.VarChar, params?.detalles ?? '')
    .input('TelefonoAlumno',sql.Int, params?.telefonoalumno ?? 0)
    .input('Horario',sql.DateTime, params?.horario ?? '')
    .query(query);
    return response;
};
export default dbHelper;