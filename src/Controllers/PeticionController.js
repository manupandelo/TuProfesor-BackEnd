import { Router } from 'express';
import { Authenticate } from '../common/jwt.strategy.js';
import { PeticionService } from '../Services/PeticionService.js';

const router = Router();
const peticionService = new PeticionService();

router.get('/all', Authenticate, async (req, res) => {
  console.log(`This is a get operation`);
  const Peticions = await peticionService.getPeticion();
  return res.status(200).json(Peticions);
});

router.get('/:id', Authenticate, async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a get operation`);

  const Peticion = await peticionService.getPeticionById(req.params.id);

  return res.status(200).json(Peticion);
});

router.get('/teacher/:id', Authenticate, async (req, res) => {
    console.log(`Request URL Param: ${req.params.id}`);
    console.log(`This is a get operation`);
  
    const Peticion = await peticionService.getPeticionById(req.params.id);
  
    return res.status(200).json(Peticion);
});

router.get('/user/:id', Authenticate, async (req, res) => {
    console.log(`Request URL Param: ${req.params.id}`);
    console.log(`This is a get operation`);
  
    const Peticion = await peticionService.getPeticionById(req.params.id);
  
    return res.status(200).json(Peticion);
});

router.post('/create', Authenticate, async (req, res) => {
  console.log(`This is a post operation`);

  const Peticion = await peticionService.createPeticion(req.body);

  return res.status(201).json(Peticion);
});

router.put('/update/:id', Authenticate, async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a put operation`);

  const Peticion = await peticionService.updatePeticionById(req.params.id, req.body);

  return res.status(200).json(Peticion);
});

router.delete('/delete/:id', Authenticate, async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a delete operation`);

  const Peticion = await peticionService.deletePeticionById(req.params.id);

  return res.status(200).json(Peticion);
});

export default router;
