import sql from 'mssql'
import config from '../../../TuProfesor-Backend/db.js'

const ProfesorHelper = async (params, query)=>{
    let response;
    const pool = await sql.connect(config);
    response = await pool.request()
    .input('Id',sql.Int, params?.id ?? 0)
    .input('Nombre',sql.VarChar, params?.Profesor?.nombre ?? '')
    .input('Apellido',sql.VarChar, params?.Profesor?.apellido ?? '')
    .input('Nacimiento',sql.Date, params?.Profesor?.borndate ?? '2000-01-01')
    .input('Ubicacion',sql.VarChar, params?.Profesor?.ubicacion ?? '')
    .input('Telefono',sql.Int, params?.Profesor?.telefono ?? '')
    .input('Activo',sql.Bit, params?.Profesor?.activo ?? 0)
    .input('Disponibilidad',sql.Date, params?.Profesor?.disponibilidad ?? '2000-01-01')
    .input('TipoClase',sql.Bit, params?.Profesor?.tipo ?? 0)
    .input('IdUser',sql.Int, params?.Profesor?.idUser ?? 0)
    .query(query)
    return response;
};
export default ProfesorHelper