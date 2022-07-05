import sql from 'mssql'
import config from '../../db.js'

const AlumnoHelper = async (params, query)=>{
    let response;
    const pool = await sql.connect(config);
    response = await pool.request()
    .input('Id',sql.Int, params?.id ?? 0)
    .input('Nombre',sql.VarChar, params?.Alumno?.nombre ?? '')
    .input('Apellido',sql.VarChar, params?.Alumno?.apellido ?? '')
    .input('Ubicacion',sql.VarChar, params?.Alumno?.ubicacion ?? '')
    .input('IdUser',sql.Int, params?.Alumno?.iduser ?? 0)
    .query(query);
    return response;
};
export default AlumnoHelper;
