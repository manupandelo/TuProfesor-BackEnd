import 'dotenv/config'
import sql from 'mssql'
import config from '../../../TuProfesor-Backend/db.js'

const ProfesorTabla = process.env.DB_TABLA_Profesor;
const PeticionTabla = process.env.DB_TABLA_Peticion;
const UsuarioTabla = process.env.DB_TABLA_Usuario;
const ReviewTabla = process.env.DB_TABLA_Review;

export class ProfesorService {

    getProfesor = async (name, materia, ubicacion, tipoclase,) => {
        console.log('Get all Profesores by user preferences in Profesor Service');
        let response;
        let query;
        query=`SELECT * from ${UsuarioTabla}`;
        const pool = await sql.connect(config);
        response = await pool.request().query(query)
        
        console.log(response)
        return response.recordset;
    }

    getProfesorById = async (id) => {
        console.log('Get Profesor by its ID in Profesor Service');
        let query1=`SELECT * from ${ProfesorTabla} where id = @id`
        let query2=`SELECT * from ${ReviewTabla} where idProfesor = @id`
        const pool = await sql.connect(config);
        let Profesor = await pool.request()
        .input('Id',sql.Int, id)
        .query(query);

        let Reviews =await pool.request()
        .input('Id',sql.Int, id)
        .query(query2);
        console.log(Reviews)

        Profesor.recordset[0].Reviews=Reviews.recordset;
        return Profesor.recordset;
    }

    getPeticionByTeacherId = async (id) => {
        console.log('Get Peticion by the Teacher ID');
        let response;
        let query=`SELECT * from ${PeticionTabla} where idProfesor = @Id`;
        const pool = await sql.connect(config);
        response = await pool.request()
        .input('Id',sql.Int, id)
        .query(query)
        console.log(response)

        return response.recordset;
    }

    createProfesor = async (Profesor) => {
        console.log('Create New Profesor in Profesor Service');
        let response;
        let query=`INSERT INTO ${ProfesorTabla}(nombre, apellido, email, password, borndate, ubicacion, telefono, activo, disponibilidad, tipo) VALUES (@Nombre, @Apellido, @Email, @Password, @Nacimiento, @Ubicacion, @Telefono, @Activo, @Disponibilidad, @TipoClase)`;
        
        const pool = await sql.connect(config);
        response = await pool.request()
        .input('Nombre',sql.VarChar, Profesor?.nombre ?? '')
        .input('Apellido',sql.VarChar, Profesor?.apellido ?? '')
        .input('Email',sql.VarChar, Profesor?.email ?? '')
        .input('Password',sql.VarChar, Profesor?.password ?? '')
        .input('Nacimiento',sql.Date, Profesor?.borndate ?? '')
        .input('Ubicacion',sql.VarChar, Profesor?.ubicacion ?? '')
        .input('Telefono',sql.Int, Profesor?.telefono ?? '')
        .input('Activo',sql.Bit, Profesor?.activo ?? 0)
        .input('Disponibilidad',sql.Date, Profesor?.disponibilidad ?? '')
        .input('TipoClase',sql.Bit, Profesor?.tipo ?? 0)
        .query(query)
        console.log(response)

        return response.recordset;
    }

    updateProfesorById = async (id, Profesor) => {
        console.log('Update Profesor by ID in Profesor Service');
        let response;
        count=false;
        let query=`UPDATE ${ProfesorTabla} SET nombre=@Nombre, apellido=@Apellido, email=@Email, password=@Password, borndate=@Nacimiento, ubicacion=@Ubicacion, telefono=@Telefono, activo=@Activo, disponibilidad=@Disponibilidad, tipo=@TipoClase  WHERE id = @Id`;
        if(Profesor.email){
            query+=` email=@Email`
            count=true;
        }if(Profesor.password){
            if(count=true){
                query+=`, password=@Password`
            }else{
                query=` password=@Password`
                count=true;
            }
        }if(Profesor.telefono){
            if(count=true){
                query+=`, telefono=@Telefono`
            }else{
                query=` telefono=@Telefono`
                count=true;
            }
        }if(Profesor.ubicacion){
            if(count=true){
                query+=`, ubicacion=@Ubicacion`
            }else{
                query=` ubicacion=@Ubicacion`
                count=true;
            }
        }if(Profesor.telefono){
            if(count=true){
                query+=`, telefono=@Telefono`
            }else{
                query=` Telefono=@Telefono`
                count=true;
            }
        }
        const pool = await sql.connect(config);
        response = await pool.request()
        .input('Id',sql.Int, id)
        .input('Nombre',sql.VarChar, Profesor?.nombre ?? '')
        .input('Apellido',sql.VarChar, Profesor?.apellido ?? '')
        .input('Email',sql.VarChar, Profesor?.email ?? '')
        .input('Password',sql.VarChar, Profesor?.password ?? '')
        .input('Nacimiento',sql.Date, Profesor?.borndate ?? '')
        .input('Ubicacion',sql.VarChar, Profesor?.ubicacion ?? '')
        .input('Telefono',sql.Int, Profesor?.telefono ?? '')
        .input('Activo',sql.Bit, Profesor?.activo ?? 0)
        .input('Disponibilidad',sql.Date, Profesor?.disponibilidad ?? '')
        .input('TipoClase',sql.Bit, Profesor?.tipo ?? 0)
        .query(query)
        console.log(response)

        return response.recordset;
    }

    deleteProfesorById = async (id) => {
        console.log('Delete Profesor by ID in Profesor Service');
        let response;
        let query=`DELETE FROM ${ProfesorTabla} WHERE id = @Id`;
        const pool = await sql.connect(config);
        response = await pool.request()
        .input('Id',sql.Int, id)
        .query(query)
        console.log(response)

        return response.recordset;
    }
}