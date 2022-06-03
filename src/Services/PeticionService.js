import 'dotenv/config'
import PeticionHelper from '../Helpers/PeticionHelper'

const ProfesorTabla = process.env.DB_TABLA_Profesor;
const PeticionTabla = process.env.DB_TABLA_Peticion;
const UsuarioTabla = process.env.DB_TABLA_Usuario;

export class PeticionService {

    getPeticion = async () => {
        console.log('Get All Peticiones');
        let response;
        let query=`SELECT * from ${PeticionTabla}`
        response=await PeticionHelper(undefined,peticion,query);
        console.log(response)
        return response.recordset;
    }

    getPeticionById = async (id) => {
        console.log('Get Peticion by its ID');
        let response;
        let query=`SELECT * from ${PeticionTabla} where idPeticion = @id`;
        response=await PeticionHelper(id, undefined, query);
        console.log(response)

        return response.recordset[0];
    }

    createPeticion = async (Peticion) => {
        console.log('create Peticion in Peticion Service');
        let response;
        let query=`INSERT INTO ${PeticionTabla}(nombre, imagen, edad, peso, historia) VALUES (@nombre, @imagen, @edad, @peso, @historia)`
        response=await PeticionHelper(undefined, Peticion, query)

        console.log(response)

        return response.recordset;
    }

    updatePeticionById = async (id, Peticion) => {
        console.log('Update Peticion by Id in Peticion Service');
        console.log(id, Peticion)
        let response;
        let query=`UPDATE ${PeticionTabla} SET imagen = @Imagen, nombre = @Nombre, edad = @Edad, peso = @Peso, historia = @Historia WHERE id = @id`;
        response=await PeticionHelper(id, Peticion, query);
        console.log(response)

        return response.recordset;
    }

    deletePeticionById = async (id) => {
        console.log('Delete peticion by id in Peticion service');
        let response;
        let query=`DELETE FROM ${PeticionTabla} WHERE id = @id`;
        response=await PeticionHelper(id, undefined, query);
        console.log(response)

        return response.recordset;
    }
}