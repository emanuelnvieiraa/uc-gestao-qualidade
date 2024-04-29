import mongoose from "mongoose";

const connectDatabase = () => {
    console.log("Estamos conectando o com banco de dados...")

    mongoose
    .connect( process.env.MONGODB_URI ,
        /*{ //opção descontinuada
            useNewUrlParser: true,
            useUnifiedTopology: true
        }*/)
    .then(() => console.log("MongoDB Atlas Conectado")) 
    .catch((err) => console.log(err))
}

export default connectDatabase;