import mongoose from "mongoose";

const ImovelSchema = new mongoose.Schema({
    cidade: {type: String, required: true},
    bairro: {type: String, required: true},
    rua: {type: String, required: true},
    numero: {type: Number, required: true},

    tipoDeImovel: {type: String, required: true},
    tipoDeNegocio: {type: String, required: true},
    atualDisponibilidade: {type: String, required: true},
    telefoneContato: {type: Number, required: true},
    imagemImovel: {type: String, required: true},
    dataAnuncio: {type: Date, default: Date.now()},
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", require: true}
});

const Imovel = mongoose.model("Imovel", ImovelSchema)

export default Imovel