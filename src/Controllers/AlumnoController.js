import { Router } from 'express';
import { Authenticate } from '../Common/jwt.strategy.js';
import { AlumnoService } from '../Services/AlumnoService.js';

const router = Router();
const alumnoService = new AlumnoService();

router.get('', Authenticate, async (req, res) => {
  console.log(`Get Alumnos`);
  const Alumnos = await alumnoService.getAlumno();
  return res.status(200).json(Alumnos);
});

router.get('/:id', Authenticate, async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`Get Alumno`);

  const Alumno = await alumnoService.getAlumnoById(req.params.id);

  return res.status(200).json(Alumno);
});

router.get('/peticion/:id', Authenticate, async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`Get Peticiones from an user`);

  const Peticion = await alumnoService.getPeticionByUserId(req.params.id);

  return res.status(200).json(Peticion);
});

router.get('/reviews/:id', Authenticate, async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`Get Peticiones from an user`);

  const Peticion = await alumnoService.getReviewByUserId(req.params.id);

  return res.status(200).json(Peticion);
});

router.post('', Authenticate, async (req, res) => {
  console.log(`This is a post operation`);
  if(!req.body.nombre || !req.body.apellido || !req.body.ubicacion || !req.body.idUser){
    return res.status(400).json("Llenar todos los datos");
  }
  else{
    const Alumno = await alumnoService.createAlumno(req.body);
    return res.status(201).json(Alumno);
  }
});

router.put('/:id', Authenticate, async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a put operation`);

  const Alumno = await alumnoService.updateAlumnoById(req.params.id, req.body);

  return res.status(200).json(Alumno);
});

router.delete('/:id', Authenticate, async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a delete operation`);

  const Alumno = await alumnoService.deleteAlumnoById(req.params.id);

  return res.status(200).json(Alumno);
});

export default router;