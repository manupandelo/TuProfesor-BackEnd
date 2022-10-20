import { Router } from 'express';
import { Authenticate } from '../Common/jwt.strategy.js';
import { PeticionService } from '../Services/PeticionService.js';

const router = Router();
const peticionService = new PeticionService();

router.get('', /*Authenticate,*/ async (req, res) => {
  console.log(`This is a get operation`);
  const Peticions = await peticionService.getPeticion();
  return res.status(200).json(Peticions);
});

router.get('/id/:id', /*Authenticate,*/ async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a get operation`);

  const Peticion = await peticionService.getPeticionById(req.params.id);

  return res.status(200).json(Peticion);
});

router.post('', /*Authenticate,*/ async (req, res) => {
  console.log(`Create Peticion`);
  if(!req.body.idProfesor || !req.body.idAlumno || !req.body.horario || !req.body.detalles || req.body.horario<1 || req.body.horario>24){
    return res.status(400).json("Llenar todos los datos");
  }
  else{
    const Peticion = await peticionService.createPeticion(req.body);
    return res.status(201).json(Peticion);
  }
});

router.put('/:id', /*Authenticate,*/ async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`Request Body:, ${req.body.Estado}`);
  console.log(`Update Peticion`);

  const Peticion = await peticionService.updatePeticionById(req.params.id, req.body);

  return res.status(200).json(Peticion);
});

router.delete('/:id', /*Authenticate,*/ async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`Delete Peticion`);

  const Peticion = await peticionService.deletePeticionById(req.params.id);

  return res.status(200).json(Peticion);
});

export default router;
