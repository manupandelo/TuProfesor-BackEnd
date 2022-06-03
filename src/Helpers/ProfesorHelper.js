import sql from 'mssql'
import config from './db.js'

const ProfesorHelper = async (id, params, query) => {
    const pool = await sql.connect(config);
    const response = await pool.request()
    .input('Id',sql.Int, id)
    .input('Nombre',sql.VarChar, params?.nombre ?? '')
    .input('Apellido',sql.VarChar, params?.apellido ?? '')
    .input('Email',sql.VarChar, params?.email ?? '')
    .input('Password',sql.VarChar, params?.password ?? '')
    .input('Nacimiento',sql.Date, params?.borndate ?? '')
    .input('Ubicacion',sql.VarChar, params?.ubicacion ?? '')
    .input('Telefono',sql.Int, params?.telefono ?? '')
    .input('Activo',sql.Bit, params?.activo ?? 0)
    .input('Disponibilidad',sql.Date, params?.disponibilidad ?? '')
    .input('Activo',sql.Bit, params?.activo ?? 0)
    .input('Materias',sql.Bit, params?.Materia ?? '') //arreglar esto para hacer una mejor relacion
    .query(query);
    return response;
};
export default ProfesorHelper;