/*const route = require('express').Router();
const userController = require('../controllers/user.controller');
const { validId, validUser } = require("../middlewares/global.middlewares")*/

import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { validId, validUser } from "../middlewares/global.middlewares.js";

const router = Router();

//rota de post que chama no nosso controller a função create
router.post("/", userController.create);
router.get("/", userController.findAll);
router.get("/:id", validId, validUser, userController.findById);
router.patch("/:id", validId, validUser, userController.update);


export default router;