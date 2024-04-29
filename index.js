/*const express = require("express");
const connectDatabase = require("./src/database/db")
//cria o módulo de rotas
const userRoute = require("./src/routes/user.route")*/

import express from 'express';
import cors from 'cors';
import connectDatabase from "./src/database/db.js";
import dotenv from "dotenv";

import userRoute from "./src/routes/user.route.js";
import authRoute from "./src/routes/auth.route.js";
import imovelRoute from "./src/routes/imovel.route.js";
import swaggerRoute from "./src/routes/swagger.route.js";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
connectDatabase()
app.use(express.json());
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/imovel", imovelRoute);
app.use("/doc", swaggerRoute);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
