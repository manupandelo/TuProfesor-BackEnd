import sql from 'mssql'
import config from '../../../TuProfesor-Backend/db.js'

const ReviewHelper = async (params, query)=>{
    let response;
    const pool = await sql.connect(config);
    response = await pool.request()
    .input('Id', sql.Int, params?.id ?? 0)
    .input('IdProfesor',sql.Int, params?.Review?.idProfesor ?? 0)
    .input('IdAlumno',sql.Int, params?.Review?.idAlumno ?? 0)
    .input('Detalles',sql.VarChar, params?.Review?.detalles ?? '')
    .input('Horario',sql.DateTime, params?.Review?.califacion ?? 1)
    .input('Descripcion', sql.VarChar, params?.Review?.descripcion ?? '')
    .query(query);
};
export default ReviewHelper;