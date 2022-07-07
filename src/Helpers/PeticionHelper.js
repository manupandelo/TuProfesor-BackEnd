import sql from 'mssql'
import config from '../../../TuProfesor-Backend/db.js'

const peticionHelper = async (params, query)=>{
    let response;
    const pool = await sql.connect(config);
    response = await pool.request()
    .input('Id', sql.Int, params?.id ?? 0)
    .input('IdProfesor',sql.Int, params?.Peticion?.idProfesor ?? 0)
    .input('IdAlumno',sql.Int, params?.Peticion?.idAlumno ?? 0)
    .input('Detalles',sql.VarChar, params?.Peticion?.detalles ?? '')
    .input('Horario',sql.DateTime, params?.Peticion?.horario ?? '2000-01-01 00:00:00')
    .query(query);
    return response;
};
export default peticionHelper;