import { Router } from 'express';
import { TokenService } from '../Services/TokenService.js';

const router = Router();
const tokenService = new TokenService();

router.get('/login', async (req, res) => {
  console.log(`This is a get operation`);
  const token = await tokenService.getToken();
  console.log(token);
  return res.status(200).json(token);
});

export default router;