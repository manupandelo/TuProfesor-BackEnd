import 'dotenv/config'
import ReviewHelper from '../Helpers/ReviewHelper.js'

const ProfesorTabla = process.env.DB_TABLA_Profesor;
const ReviewTabla = process.env.DB_TABLA_Review;
const UsuarioTabla = process.env.DB_TABLA_Usuario;
export class ReviewService {

    getReviews = async () => {
        console.log('Get All Reviews');
        let response;
        let query=`SELECT * from ${ReviewTabla}`
        response=ReviewHelper(undefined, query)
        console.log(response)
        return response.recordset;
    }

    getReviewById = async (id) => {
        console.log('Get Review by its ID');
        let response;
        let query=`SELECT * from ${ReviewTabla} where idReview = @Id`;
        const pool = await sql.connect(config);
        response=ReviewHelper({id}, query)
        console.log(response)
        return response.recordset;
    }

    createReview = async (Review) => {
        console.log('create Review in Review Service');
        let response;
        let query=`INSERT INTO ${ReviewTabla}(idAlumno, idProfesor, calificacion, nombre, descripcion) VALUES (@IdAlumno, @IdProfesor, @Calificacion, @Nombre, @Descripcion)`
        response=ReviewHelper({Review}, query)
        console.log(response)
        return response.recordset;
    }

    updateReviewById = async (id, Review) => {
        console.log('Update Review by Id in Review Service');
        console.log(id, Review)
        let response;
        let query;
        if(!Review.descripcion){
            if(!Review.califacion || Review.califacion>5 || Review.califacion<=0){
               return "Nada que cambiar";
            }else{
                query=`update ${ReviewTabla} SET calificacion=@Calificacion where idReview=@Id`
            }
        }
        else{
            if(!Review.califacion || Review.califacion>5 || Review.califacion<=0){
                query=`update ${ReviewTabla} SET descripcion=@Descripcion where idReview=@Id`
            }
            else{
                query=`update ${ReviewTabla} SET descripcion=@Descripcion, calificacion=@Calificacion where idReview=@Id`
            }
        }
        response=ReviewHelper({id, Review}, query)
        console.log(response)
        return response.recordset;
    }

    deleteReviewById = async (id) => {
        console.log('Delete Review by id in Review service');
        let response;
        let query=`DELETE FROM ${ReviewTabla} WHERE idReview = @id`;
        response=ReviewHelper(undefined, query)
        console.log(response)

        return response.recordset;
    }
}