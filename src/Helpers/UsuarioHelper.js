import sql from 'mssql'
import config from './db.js'

const dbHelper = async (id, params, query) => {
    const pool = await sql.connect(config);
    const response = await pool.request()
    .input('Id',sql.Int, id)
    .input('Nombre',sql.VarChar, params?.nombre ?? '')
    .input('Ubicacion',sql.VarChar, params?.ubicacion ?? '')
    .input('Email',sql.VarChar, params?.email ?? '')
    .input('Password',sql.VarChar, params?.password ?? '')
    .query(query);
    return response;
};
export default dbHelper;