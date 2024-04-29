import { Router } from "express";
const router = Router();

import { create, findAll, findById, searchByCidade, byUser, update, erase } from "../controllers/imovel.controller.js"
import { authMiddlewere } from "../middlewares/auth.middleware.js";

router.post("/", authMiddlewere, create);
router.get("/", findAll);
router.get("/search", searchByCidade);
router.get("/byUser", authMiddlewere, byUser)
router.patch("/:id", authMiddlewere, update)
router.delete("/:id", authMiddlewere, erase)
router.get("/:id", authMiddlewere, findById);


export default router;