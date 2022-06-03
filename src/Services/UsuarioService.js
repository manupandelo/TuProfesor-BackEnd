import 'dotenv/config'
import UsuarioHelper from '../Helpers/UsuarioHelper'
import PeticionHelper from '../Helpers/PeticionHelper'

const ProfesorTabla = process.env.DB_TABLA_Profesor;
const PeticionTabla = process.env.DB_TABLA_Peticion;
const UsuarioTabla = process.env.DB_TABLA_Usuario;

export class UsuarioService {

    getUsuario = async (filtros) => {
        console.log('Get All Usuarios in Usuario Service');
        let response;
        let query=`SELECT * from ${UsuarioTabla}`
        response=await UsuarioHelper(undefined, filtros, query)
        console.log(response)
        return response.recordset;
    }

    getUsuarioById = async (id) => {
        console.log('Get Usuario By Id in Usuario Service');
        let response;
        let query=`SELECT * from ${UsuarioTabla} where id = @id`
        response=await UsuarioHelper(id, undefined, query);
        console.log(response)

        return response.recordset;
    }

    getPeticionByUserId = async (id) => {
        console.log('Get Peticion by the User Id');
        let response;
        let query=`SELECT * from ${PeticionTabla} where idAlumno = @id`
        response=await PeticionHelper(id, undefined, query);
        console.log(response)

        return response.recordset;
    }

    createUsuario = async (Usuario) => {
        console.log('Create New Usuario in Usuario Service');
        //Ver bien como hacer que se inserten todas las variables y que no esten en null
        let response;
        let query=`INSERT INTO ${UsuarioTabla}(email, password, ubicacion, nombre, apellido) VALUES (@Email, @Password, @Ubicacion, @Nombre, @Apellido)`
        response=await UsuarioHelper(undefined, Usuario, query);
        console.log(response)

        return response.recordset;
    }
    
    updateUsuarioById = async (id, Usuario) => {
        //ver encriptacion para claves y/o emails
        console.log('Update Usuario by Id in Usuario Service');
        console.log(id, Usuario)
        let response;
        let query=`UPDATE ${UsuarioTabla} SET imagen = @Imagen, nombre = @Nombre, edad = @Edad, peso = @Peso, historia = @Historia WHERE id = @id`;
        response=await UsuarioHelper(id, Usuario, query);
        console.log(response)

        return response.recordset;
    }

    deleteUsuarioById = async (id) => {
        console.log('Delete Usuario by Id in Usuario Service');
        let response;
        let query=`DELETE FROM ${UsuarioTabla} WHERE id = @id`;
        response=await UsuarioHelper(id, undefined, query);
        console.log(response)

        return response.recordset;
    }
}