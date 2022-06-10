import sql from 'mssql'
import config from '../../../TuProfesor-Backend/db.js'

const UsuarioHelper = async (params, query)=>{
    let response;
    const pool = await sql.connect(config);
    response = await pool.request()
    .input('Nombre',sql.VarChar, params?.nombre ?? '')
    .input('Apellido',sql.VarChar, params?.apellido ?? '')
    .input('Ubicacion',sql.VarChar, params?.ubicacion ?? '')
    .input('Email',sql.VarChar, params?.email ?? '')
    .input('Password',sql.VarChar, params?.password ?? '')
    .query(query);
    return response;
};
export default UsuarioHelper
