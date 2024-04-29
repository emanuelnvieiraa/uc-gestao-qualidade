import mongoose from "mongoose";
import userService from "../services/user.service.js";


//funções de interceptação, vai interceptar a chamada entre a rota e a função de callback

export const validId = (req, res, next) => {
    try {
        const id = req.params.id

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: "Id inválido" })
        }

        next()
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
};

export const validUser = async (req, res, next) => {
    try {
        const id = req.params.id;

        const user = await userService.findByIdUserService(id);

        if (!user) {
            return res.status(400).send({ message: "Usuário não encontrado " })
        }

        //requisição a ser enviada para próxima função vai conter id e user
        req.id = id;
        req.user = user;

        next();
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
};

