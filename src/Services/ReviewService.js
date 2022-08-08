import 'dotenv/config'
import connection from '../../db.js'

export class ReviewService {

    getReviews = async () => {
        console.log('Get All Reviews');
        
        let query=`SELECT * from Review`
        connection.query(query, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            return result;
        });
    }

    getReviewById = async (id) => {
        console.log('Get Review by its ID');
        
        let query=`SELECT * from Review where idReview = ?`;
        connection.query(query,[id], function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            return result;
        });
    }

    createReview = async (Review) => {
        console.log('create Review in Review Service');
        let query=`INSERT INTO Review(idAlumno, idProfesor, calificacion, nombre, descripcion) VALUES (?,?,?,?,?)`
        connection.query(query,[Review.idAlumno,Review.idProfesor, Review.califacion, Review.nombre, Review.descripcion], function (err, result, fields) {
            if (err) throw err;
            console.log('affected rows: ' + result.affectedRows);
            console.log(result);
            return result;
        });
    }

    updateReviewById = async (id, Review) => {
        console.log('Update Review by Id in Review Service');
        console.log(id, Review)
        let variables;
        let query;
        if(!Review.descripcion){
            if(!Review.califacion || Review.califacion>5 || Review.califacion<=0){
               return "Nada que cambiar";
            }else{
                query=`update Review SET calificacion=? where idReview=?`
                variables=[Review.califacion, Review.id]
            }
        }
        else{
            if(!Review.califacion || Review.califacion>5 || Review.califacion<=0){
                query=`update Review SET descripcion=? where idReview=?`
                variables=[Review.descripcion, Review.id]
            }
            else{
                query=`update Review SET descripcion=?, calificacion=? where idReview=?`
                variables=[Review.descripcion, Review.califacion, Review.id]
            }
        }
        connection.query(query,variables, function (err, result, fields) {
            if (err) throw err;
            console.log('affected rows: ' + result.affectedRows);
            console.log(result);
            return result;
        });//response=await ReviewHelper({id, Review}, query)
        console.log(response)
        return response.recordset;
    }

    deleteReviewById = async (id) => {
        console.log('Delete Review by id in Review service');
        
        let query=`DELETE FROM Review WHERE idReview = ?`;
        connection.query(query,[id], function (err, result, fields) {
              if (err) throw err;
              console.log('affected rows: ' + result.affectedRows);
              console.log(result);
              return result;
            });
    }
}