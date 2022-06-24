import sql from 'mssql'
import config from '../../../TuProfesor-Backend/db.js'

const UsuarioHelper = async (params, query)=>{
    let response;
    const pool = await sql.connect(config);
    response = await pool.request()
    .input('Id',sql.Int, params?.id ?? 0)
    .input('Password',sql.VarChar, params?.password ?? '')
    .input('Email',sql.VarChar, params?.email ?? '')
    .input('Tipo',sql.Bit, params?.califacion ?? 1)
    .query(query);
};
export default UsuarioHelper;