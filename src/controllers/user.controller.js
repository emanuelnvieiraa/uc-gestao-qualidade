import userService from "../services/user.service.js";
//mongoose não mais usado em razão da criação do middleware
//const mongoose = require("mongoose")


//função create para user, recebe de services
//série de verificações feitas pela função create
const create = async (req, res) => {
    try {
        const { name, username, email, password, avatar, background } = req.body;
        //para o caso de alguma das informações solicitadas não ser fornecida pelo usuário
        if (!name || !username || !email || !password || !avatar || !background) {
            res.status(400).send({
                message: "Por favor, preencha todos os campos!",
            })
        }
        //chama o service onde cria efetivamente o nosso usuário
        const user = await userService
        .createUserService(req.body)
        .catch((err) => console.log(err.message));

        if (!user) {
            return res.status(400).send({ 
                message: "Erro ao criar usuário" })
        }


        res.status(201).send({
            message: "Usuário criado com sucesso",
            user: {
                id: user._id,
                name,
                username,
                email,
                avatar,
                background
            },
        });
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
};

//Função GET para user, recebe de services
const findAll = async (req, res) => {
    try {
        const users = await userService.findAllUserService()

        if (users.length === 0) {
            return res.status(400).send({ message: "Não existe usuários registrados" })
        }

        res.send(users)
    } catch (err) {
        res.status(500).send({ message: err.message })
    }

};

//função GET para id de user, recebe de services
const findById = async (req, res) => {
    //const id = req.params.id --- vers 1
    //const id = req.id; --- vers 2

    /* if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send({ message: "Id inválido" })
    }
    */
    //o retorno em services é colocado em user
    //const user = await userService.findByIdService(id)
    const user = req.user;

    /*  if (!user) {
         return res.status(400).send({ message: "Usuário não encontrado" })
     } */

    res.send(user)
};

const update = async (req, res) => {
    const { name, username, email, password, avatar, background } = req.body;

    if (!name && !username && !email && !password && !avatar && !background) {
        res.status(400).send({ message: "Por favor, submeta ao menos um campo para concluir alteração!" });
    }
    //const id = req.params.id;
    const { id, user } = req;

    /* if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: "Invalid ID"});
    } */

    /* const user = await userService.findByIdService(id); */

    /*  if (!user) {
         return res.status(400).send({ message: "User not found"});
     } */

    await userService.updateUserService(
        id,
        name,
        username,
        email,
        password,
        avatar,
        background
    );

    res.send({ message: "Usuário atualizado com sucesso!" })
};


export default { create, findAll, findById, update };