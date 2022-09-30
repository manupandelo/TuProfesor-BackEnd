import { Router } from 'express';
import { Authenticate } from '../Common/jwt.strategy.js';
import { ProfesorService } from '../Services/ProfesorService.js';

const router = Router();
const profesorService = new ProfesorService();

router.get('', async (req, res) => {
  console.log(`This is a get operation`);
  const Profesors = await profesorService.getProfesor(req.query.materia, req.query.ubicacion, req.query.tipo);
  return res.status(200).json(Profesors);
});

router.get('/activos', async (req, res) => {
  console.log(`This is a get operation`);
  const Profesors = await profesorService.getProfesoresActivos();
  return res.status(200).json(Profesors);
});

router.get('/id/:id', /*Authenticate,*/ async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a get operation`);

  const Profesor = await profesorService.getProfesorById(req.params.id);

  return res.status(200).json(Profesor);
});

router.get('/materias', /*Authenticate,*/ async (req, res) => {
  console.log(`This is a get operation`);

  const materias = await profesorService.getMaterias();

  return res.status(200).json(materias);
});

router.get('/peticion/:id', /*Authenticate,*/ async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`Get Peticiones from Teacher`);

  const Peticion = await profesorService.getPeticionById(req.params.id);

  return res.status(200).json(Peticion);
});

router.post('/register', /*Authenticate,*/ async (req, res) => {
  console.log(`This is a post operation`);
  if(!req.body.email || !req.body.password || !req.body.nombre || !req.body.apellido || !req.body.borndate || !req.body.ubicacion || !req.body.telefono || !req.body.disponibilidad || !req.body.tipo){
    return res.status(400).json("Llenar todos los datos");
  }
  else{
  const Profesor = await profesorService.createProfesor(req.body);
  return res.status(201).json(Profesor);}
});

router.put('/:id', /*Authenticate,*/ async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a put operation`);

  const Profesor = await profesorService.updateProfesorById(req.params.id, req.body);

  return res.status(200).json(Profesor);
});

router.delete('/:id', /*Authenticate,*/ async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a delete operation`);

  const Profesor = await profesorService.deleteProfesorById(req.params.id);

  return res.status(200).json(Profesor);
});

router.post('/login', async (req, res) => {
  console.log(`Log In Profesor`)
  console.log(req.body);
  if(!req.body.email || !req.body.password){
    return res.status(404).json("Error, llenar los datos por completo");
  }else{
    const response = await profesorService.login(req.body);
    console.log(response)
    if(response==false){
      return res.status(404).json("Error en email o contraseña")
    }
    return res.status(200).json(response);
  }
})

export default router;
