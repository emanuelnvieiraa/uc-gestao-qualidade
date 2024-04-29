//acesso ao banco de dados
import User from "../models/User.js"

const createUserService = (body) => User.create(body)

const findAllUserService = () => User.find()

const findByIdUserService = (id) => User.findById(id)

const updateUserService = (
    id,
    name,
    username,
    email,
    password,
    avatar,
    background
) => User.findOneAndUpdate({_id: id}, { name, username, email, password, avatar, background })

export default {
    createUserService,
    findAllUserService,
    findByIdUserService,
    updateUserService,
};