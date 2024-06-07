/*const express = require("express");
const connectDatabase = require("./src/database/db")
//cria o módulo de rotas
const userRoute = require("./src/routes/user.route")*/

import express from 'express';
import cors from 'cors';
import connectDatabase from "./database/db.js";
import dotenv from "dotenv";

import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import imovelRoute from "./routes/imovel.route.js";
//import swaggerRoute from "./routes/swagger.route.js";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
connectDatabase()
app.use(express.json());
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/imovel", imovelRoute);
//app.use("/doc", swaggerRoute);

//app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

export default app;
