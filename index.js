import express from "express";
import cors from "cors";
//import passport from 'passport';
//import jwtStrategy from './src/Common/jwt.strategy';
import AlumnoRouter from './src/Controllers/AlumnoController.js';
import ProfesorRouter from './src/Controllers/ProfesorController.js';
import PeticionRouter from './src/Controllers/PeticionController.js';
import ReviewRouter from './src/Controllers/ReviewController.js';
import UsuarioRouter from './src/Controllers/UsuarioController.js';


const port=3000;
var app = express();

app.use(cors());
app.use(express.json());
//passport.use(jwtStrategy);
//app.use(passport.initialize());


app.use("/users", UsuarioRouter);
app.use("/students", AlumnoRouter)
app.use("/teachers", ProfesorRouter);
app.use("/peticiones", PeticionRouter);
app.use("/reviews", ReviewRouter);


app.listen(process.env.PORT || port, () => {
  console.log(`Live at ${process.env.PORT || port}`);
})