import sql from 'mssql'
import config from '../../../TuProfesor-Backend/db.js'

const ProfesorHelper = async (params, query)=>{
    let response;
    const pool = await sql.connect(config);
    response = await pool.request()
    .input('Nombre',sql.VarChar, params?.nombre ?? '')
    .input('Apellido',sql.VarChar, params?.apellido ?? '')
    .input('Nacimiento',sql.Date, params?.borndate ?? '2000-01-01')
    .input('Ubicacion',sql.VarChar, params?.ubicacion ?? '')
    .input('Telefono',sql.Int, params?.telefono ?? '')
    .input('Activo',sql.Bit, params?.activo ?? 0)
    .input('Disponibilidad',sql.Date, params?.disponibilidad ?? '2000-01-01')
    .input('TipoClase',sql.Bit, params?.tipo ?? 0)
    .input('IdUser',sql.Int, params?.iduser ?? 0)
    .query(query)
    return response;
};
export default ProfesorHelper