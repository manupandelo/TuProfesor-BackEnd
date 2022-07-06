import { Router } from 'express';
import { Authenticate } from '../Common/jwt.strategy.js';
import { UsuarioService } from '../Services/UsuarioService.js';

const router = Router();
const usuarioService = new UsuarioService();

router.get('', Authenticate, async (req, res) => {
  console.log(`This is a get operation`);
  const Usuarios = await usuarioService.getUsuario();
  return res.status(200).json(Usuarios);
});

router.get('/id/:id', Authenticate, async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a get operation`);

  const Usuario = await usuarioService.getUsuarioById(req.params.id);

  return res.status(200).json(Usuario);
});

router.post('/login', async (req, res) => {
  console.log(`Log In`)
  if(!req.body.email || !req.body.password){
    return res.status(400).json("Error, llenar los datos por completo");
  }else{
    const response = await usuarioService.LogIn(req.body);
    console.log(response)
    return res.status(200).json(response);
  }
})

router.post('/register', async (req, res) => {
  console.log(`Create Usuario`);
  if(!req.body.email || !req.body.password || !req.body.tipo){
    return res.status(400).json("Llenar todos los datos");
  }
  else{
    const Usuario = await usuarioService.createUsuario(req.body);
    return res.status(201).json(Usuario);
  }
});

router.put('/:id', Authenticate, async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`Update Usuario`);

  const Usuario = await usuarioService.updateUsuarioById(req.params.id, req.body);

  return res.status(200).json(Usuario);
});

router.delete('/:id', Authenticate, async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`Delete Usuario`);

  const Usuario = await UsuarioService.deleteUsuarioById(req.params.id);
  return res.status(200).json(Usuario);
});

export default router;

