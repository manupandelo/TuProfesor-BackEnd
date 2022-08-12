import { Router } from 'express';
import { Authenticate } from '../Common/jwt.strategy.js';
import { ReviewService } from '../Services/ReviewService.js';

const router = Router();
const reviewService = new ReviewService();

router.get('', /*Authenticate,*/ async (req, res) => {
  console.log(`This is a get operation`);
  const Reviews = await reviewService.getReviews();
  return res.status(200).json(Reviews);
});

router.get('/id/:id', /*Authenticate,*/ async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a get operation`);

  const Reviews = await reviewService.getReviewById(req.params.id);

  return res.status(200).json(Reviews);
});

router.post('', /*Authenticate,*/ async (req, res) => {
  console.log(`Create Review`);
  if(!req.body.idProfesor || !req.body.idAlumno || !req.body.nombre || !req.body.calificacion || req.body.califacion>5 || req.body.califacion<=0 || req.body.califacion==NaN){
    return res.status(400).json("Llenar todos los datos");
  }
  else{  
    const Reviews = await reviewService.createReview(req.body);
    return res.status(201).json(Reviews);
  }
});

router.put('/:id', /*Authenticate,*/ async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`Update Review`);

  const Reviews = await reviewService.updateReviewById(req.params.id, req.body);

  return res.status(200).json(Reviews);
});

router.delete('/:id', /*Authenticate,*/ async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`Delete Review`);

  const Reviews = await reviewService.deleteReviewById(req.params.id);

  return res.status(200).json(Reviews);
});

export default router;