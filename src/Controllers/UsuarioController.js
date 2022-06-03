import { Router } from 'express';
import { Authenticate } from '../common/jwt.strategy.js';
import { UsuarioService } from '../Services/UsuarioService.js';

const router = Router();
const usuarioService = new UsuarioService();

router.get('', Authenticate, async (req, res) => {
  console.log(`Get Usuarios`);
  const Usuarios = await usuarioService.getUsuario();
  return res.status(200).json(Usuarios);
});

router.get('/:id', Authenticate, async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`Get usuario`);

  const Usuario = await usuarioService.getUsuarioById(req.params.id);

  return res.status(200).json(Usuario);
});

router.get('peticion/:id', Authenticate, async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`Get Peticiones from an user`);

  const Peticion = await usuarioService.getPeticionByUserId(req.params.id);

  return res.status(200).json(Peticion);
});

router.post('', Authenticate, async (req, res) => {
  console.log(`This is a post operation`);

  const Usuario = await usuarioService.createUsuario(req.body);

  return res.status(201).json(Usuario);
});

router.put('/:id', Authenticate, async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a put operation`);

  const Usuario = await usuarioService.updateUsuarioById(req.params.id, req.body);

  return res.status(200).json(Usuario);
});

router.delete('/:id', Authenticate, async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a delete operation`);

  const Usuario = await usuarioService.deleteUsuarioById(req.params.id);

  return res.status(200).json(Usuario);
});

export default router;
