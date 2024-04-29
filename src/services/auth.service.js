import User from '../models/User.js';
import jwt from 'jsonwebtoken'

const loginService = (email) => 
    User.findOne({ email: email }).select("+password")

    //token para guardar a sessão do usuário e qual usuário no frontend
    const generateToken = (id) => 
        jwt.sign({id: id}, process.env.SECRET_JWT, {expiresIn: 86480})

export { loginService, generateToken }