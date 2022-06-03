import 'dotenv/config'
import ProfesorHelper from '../Helpers/ProfesorHelper'
import PeticionHelper from '../Helpers/PeticionHelper'
const ProfesorTabla = process.env.DB_TABLA_Profesor;
const PeticionTabla = process.env.DB_TABLA_Peticion;
const UsuarioTabla = process.env.DB_TABLA_Usuario;

export class ProfesorService {

    getProfesor = async (name, materia, ubicacion, tipoclase,) => {
        console.log('Get all Profesores by user preferences in Profesor Service');
        let response;
        let query;
        query=`SELECT * from ${UsuarioTabla}`;
        response=await ProfesorHelper(undefined,{}, query)
        console.log(response)
        return response.recordset;
    }

    getProfesorById = async (id) => {
        console.log('Get Profesor by its ID in Profesor Service');
        let response;
        let query=`SELECT * from ${ProfesorTabla} where id = @id`
        response = await ProfesorHelper(id, undefined, query);
        console.log(response)

        return response.recordset;
    }

    getPeticionByTeacherId = async (id) => {
        console.log('Get Peticion by the Teacher ID');
        let response;
        let query=`SELECT * from ${PeticionTabla} where idProfesor = @id`;
        response=await PeticionHelper(id, undefined, query);
        console.log(response)

        return response.recordset;
    }

    createProfesor = async (Profesor) => {
        console.log('Create New Profesor in Profesor Service');
        let response;
        let query=`INSERT INTO ${ProfesorTabla}(nombre, imagen, fechacreacion, calificacion) VALUES (@nombre, @imagen, @fechacreacion, 0)`;
        response=await ProfesorHelper(undefined,Profesor,query);
        console.log(response)

        return response.recordset;
    }

    updateProfesorById = async (id, Profesor) => {
        console.log('Update Profesor by ID in Profesor Service');
        let response;
        let query=`UPDATE ${ProfesorTabla} SET titulo = @Nombre, imagen = @Imagen, calificacion = @Calificacion  WHERE id = @Id`;
        response=await ProfesorHelper(id, Profesor, query);
        console.log(response)

        return response.recordset;
    }

    deleteProfesorById = async (id) => {
        console.log('Delete Profesor by ID in Profesor Service');
        let response;
        let query=`DELETE FROM ${ProfesorTabla} WHERE id = @id`;
        response=await ProfesorHelper(id, undefined, query);
        console.log(response)

        return response.recordset;
    }
}