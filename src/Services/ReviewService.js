import 'dotenv/config'
import connection from '../../db.js'

export class ReviewService {

    getReviews = async () => {
        console.log('Get All Reviews');
        let response;
        let query=`SELECT * from Review`
        connection.connect(function(err) {
            if (err) throw err;
            connection.query(query, function (err, result, fields) {
              if (err) throw err;
              console.log(result);
              response=result;
            });
        });
        connection.end();
        return response;
    }

    getReviewById = async (id) => {
        console.log('Get Review by its ID');
        let response;
        let query=`SELECT * from Review where idReview = ?`;
        connection.connect(function(err) {
            if (err) throw err;
            connection.query(query,[id], function (err, result, fields) {
              if (err) throw err;
              console.log(result);
              response=result;
            });
        });
        connection.end();
        return response;
    }

    createReview = async (Review) => {
        console.log('create Review in Review Service');
        let response;
        let query=`INSERT INTO Review(idAlumno, idProfesor, calificacion, nombre, descripcion) VALUES (?,?,?,?,?)`
        connection.connect(function(err) {
            if (err) throw err;
            connection.query(query,[Review.idAlumno,Review.idProfesor, Review.califacion, Review.nombre, Review.descripcion], function (err, result, fields) {
              if (err) throw err;
              console.log(result);
              response=result;
            });
        });
        connection.end();
        return response;
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
                query=`update Review SET calificacion=@Calificacion where idReview=@Id`
            }
        }
        else{
            if(!Review.califacion || Review.califacion>5 || Review.califacion<=0){
                query=`update Review SET descripcion=@Descripcion where idReview=@Id`
            }
            else{
                query=`update Review SET descripcion=@Descripcion, calificacion=@Calificacion where idReview=@Id`
            }
        }
        //response=await ReviewHelper({id, Review}, query)
        console.log(response)
        return response.recordset;
    }

    deleteReviewById = async (id) => {
        console.log('Delete Review by id in Review service');
        let response;
        let query=`DELETE FROM Review WHERE idReview = ?`;
        connection.connect(function(err) {
            if (err) throw err;
            connection.query(query,[id], function (err, result, fields) {
              if (err) throw err;
              console.log(result);
              response=result;
            });
        });
        connection.end();
        console.log(response)

        return response;
    }
}