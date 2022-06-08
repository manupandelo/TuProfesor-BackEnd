import express from "express";
import cors from "cors";
import passport from 'passport';
import { jwtStrategy } from './src/common/jwt.strategy.js';
import UsuarioRouter from "./src/controllers/UsuarioController.js";
import ProfesorRouter from "./src/controllers/ProfesorController.js";
import PeticionRouter from "./src/controllers/PeticionController.js";
import ReviewRouter from "./src/controllers/ReviewController.js";
import TokenRouter from "./src/controllers/TokenController.js";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
passport.use(jwtStrategy);
app.use(passport.initialize());

app.use("/users", UsuarioRouter);
app.use("/teachers", ProfesorRouter);
app.use("/peticiones", PeticionRouter);
app.use("/reviews", ReviewRouter);
app.use("/auth", TokenRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});