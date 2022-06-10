import sql from 'mssql'
import config from '../../../TuProfesor-Backend/db.js'

const ProfesorHelper = async (params, query)=>{
    let response;
    const pool = await sql.connect(config);
    response = await pool.request()
    .input('IdProfesor',sql.Int, params?.idProfesor ?? 0)
    .input('IdAlumno',sql.Int, params?.idAlumno ?? 0)
    .input('Detalles',sql.VarChar, params?.detalles ?? '')
    .input('Horario',sql.DateTime, params?.califacion ?? 1)
    .input('Descripcion', sql.VarChar, params?.descripcion ?? '')
    .query(query);
};
export default ProfesorHelper