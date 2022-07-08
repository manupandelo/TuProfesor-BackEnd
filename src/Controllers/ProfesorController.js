import { Router } from 'express';
import { Authenticate } from '../Common/jwt.strategy.js';
import { ProfesorService } from '../Services/ProfesorService.js';

const router = Router();
const profesorService = new ProfesorService();

router.get('', async (req, res) => {
  console.log(`This is a get operation`);
  const Profesors = await profesorService.getProfesor(req.query.ubicacion, req.query.materia, req.query.tipo, req.query.activo);
  return res.status(200).json(Profesors);
});

router.get('/:id', Authenticate, async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a get operation`);

  const Profesor = await profesorService.getProfesorById(req.params.id);

  return res.status(200).json(Profesor);
});

router.get('/peticion/:id', Authenticate, async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`Get Peticiones from Teacher`);

  const Peticion = await profesorService.getPeticionById(req.params.id);

  return res.status(200).json(Peticion);
});

router.post('', Authenticate, async (req, res) => {
  console.log(`This is a post operation`);
  if(!req.body.nombre || !req.body.apellido || !req.body.borndate || !req.body.ubicacion || !req.body.telefono || !req.body.activo || !req.body.disponibilidad || !req.body.tipo || !req.body.idUser){
    return res.status(400).json("Llenar todos los datos");
  }
  else{
  const Profesor = await profesorService.createProfesor(req.body);
  return res.status(201).json(Profesor);}
});

router.put('/:id', Authenticate, async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a put operation`);

  const Profesor = await profesorService.updateProfesorById(req.params.id, req.body);

  return res.status(200).json(Profesor);
});

router.delete('/:id', Authenticate, async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a delete operation`);

  const Profesor = await profesorService.deleteProfesorById(req.params.id);

  return res.status(200).json(Profesor);
});

export default router;
