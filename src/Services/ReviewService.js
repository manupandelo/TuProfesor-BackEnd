import 'dotenv/config'
import connection from '../../db.js'

export class ReviewService {

    getReviews = async () => {
        try{
            console.log('Get All Reviews');        
            let query=`SELECT * from Review`
            const [result,fields] = await connection.execute(query);
            console.log(result);
            return result;
        }   
        catch(error){
            return error;
        }   
    }

    getReviewById = async (id) => {
        try{
            console.log('Get Review by its ID');
            let query=`SELECT * from Review where idReview = ?`;
            const [result,fields] = await connection.execute(query,[id]);
            console.log(result);
            return result;
        }   
        catch(error){
            return error;
        }   
    }

    createReview = async (Review) => {
        try{
            console.log('create Review in Review Service');
            let query=`INSERT INTO Review(idAlumno, idProfesor, calificacion, nombre, descripcion) VALUES (?,?,?,?,?)`
            const [result,fields] = await connection.execute(query,[Review.idAlumno, Review.idProfesor, Review.calificacion, Review.nombre, Review.descripcion]);
            console.log('Affected rows:' + result.affectedRows);
            console.log(result);
            return result;
        }   
        catch(error){
            return error;
        }   
    }

    updateReviewById = async (id, Review) => {
        try{
            console.log('Update Review by Id in Review Service');
            console.log(id, Review)
            let values;
            let query;
            if(!Review.descripcion){
                if(!Review.califacion || Review.califacion>5 || Review.califacion<=0){
                   return "Nada que cambiar";
                }else{
                    query=`update Review SET calificacion=? where idReview=?`
                    values=[Review.califacion, Review.id]
                }
            }
            else{
                if(!Review.califacion || Review.califacion>5 || Review.califacion<=0){
                    query=`update Review SET descripcion=? where idReview=?`
                    values=[Review.descripcion, Review.id]
                }
                else{
                    query=`update Review SET descripcion=?, calificacion=? where idReview=?`
                    values=[Review.descripcion, Review.califacion, Review.id]
                }
            }
            const [result,fields] = await connection.execute(query,values);
            console.log('affected rows: ' + result.affectedRows);
            return result;//response=await ReviewHelper({id, Review}, query)
        }   
        catch(error){
            return error;
        }   
    }

    deleteReviewById = async (id) => {
        try{
            console.log('Delete Review by id in Review service');
            let query=`DELETE FROM Review WHERE idReview = ?`;
            const [result,fields] = await connection.execute(query,[id]);
            console.log('affected rows: ' + result.affectedRows);
            return result;
        }   
        catch(error){
            return error;
        }   
    }
}