import sql from 'mssql'
import config from '../../db.js'

const AlumnoHelper = async (params, query)=>{
    let response;
    const pool = await sql.connect(config);
    response = await pool.request()
    .input('Nombre',sql.VarChar, params?.nombre ?? '')
    .input('Apellido',sql.VarChar, params?.apellido ?? '')
    .input('Ubicacion',sql.VarChar, params?.ubicacion ?? '')
    .input('IdUser',sql.Int, params?.iduser ?? 0)
    .query(query);
    return response;
};
export default AlumnoHelper;
