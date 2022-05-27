import { Router } from 'express';
import { Authenticate } from '../common/jwt.strategy.js';
import { ProfesorService } from '../Services/ProfesorService.js';

const router = Router();
const profesorService = new ProfesorService();

router.get('/all', Authenticate, async (req, res) => {
  console.log(`This is a get operation`);
  const Profesors = await profesorService.getProfesor(req.query.titulo, req.query.order);
  return res.status(200).json(Profesors);
});

router.get('/:id', Authenticate, async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a get operation`);

  const Profesor = await profesorService.getProfesorById(req.params.id);

  return res.status(200).json(Profesor);
});

router.post('/create', Authenticate, async (req, res) => {
  console.log(`This is a post operation`);

  const Profesor = await profesorService.createProfesor(req.body);

  return res.status(201).json(Profesor);
});

router.put('/update/:id', Authenticate, async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a put operation`);

  const Profesor = await profesorService.updateProfesorById(req.params.id, req.body);

  return res.status(200).json(Profesor);
});

router.delete('/delete/:id', Authenticate, async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a delete operation`);

  const Profesor = await profesorService.deleteProfesorById(req.params.id);

  return res.status(200).json(Profesor);
});

export default router;
