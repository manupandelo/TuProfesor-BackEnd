import express from "express";
import cors from "cors";
import passport from 'passport';
import jwtStrategy from './src/common/jwt.strategy.js';
import AlumnoRouter from "./src/Controllers/AlumnoController.js";
import ProfesorRouter from "./src/controllers/ProfesorController.js";
import PeticionRouter from "./src/controllers/PeticionController.js";
import ReviewRouter from "./src/controllers/ReviewController.js";
import UsuarioRouter from "./src/controllers/UsuarioController.js";
//import SwaggerUI from "swagger-ui-express";
//import swaggerJSDoc from "swagger-jsdoc";

//const swaggerSpec = swaggerJSDoc(options);
const app = express();

app.use(cors());
app.use(express.json());
passport.use(jwtStrategy);
app.use(passport.initialize());

app.use("/users", UsuarioRouter);
app.use("/students", AlumnoRouter)
app.use("/teachers", ProfesorRouter);
app.use("/peticiones", PeticionRouter);
app.use("/reviews", ReviewRouter);
/*app.use('/api-docs', SwaggerUI.serve, SwaggerUI.setup(swaggerSpec));

const options = {
  definition: {
    openapi: "1.0.0",
    info:{
      title: "Library API",
      version:"1.0.0",
    },
    servers: [
      {
        url: "http://localhost:8080",
        description: "Tu Profesor API",
      },
    ],
  },
  apis: ["./src/controllers/*.js"],
};
*/

app.listen(process.env.PORT || 5000, () => {
  console.log(`Live at ${process.env.PORT || 5000}`);
})