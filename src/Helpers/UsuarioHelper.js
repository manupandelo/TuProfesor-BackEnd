import sql from 'mssql'
import config from '../../../TuProfesor-Backend/db.js'

const UsuarioHelper = async (params, query)=>{
    console.log(params.Usuario.password)
    let response;
    const pool = await sql.connect(config);
    response = await pool.request()
    .input('Id',sql.Int, params?.id ?? 0)
    .input('Password',sql.VarChar, params?.Usuario?.password ?? '')
    .input('Email',sql.VarChar, params?.Usuario?.email ?? '')
    .input('Tipo',sql.Bit, params?.Usuario?.tipo ?? 1)
    .query(query);
    return response;
};
export default UsuarioHelper;