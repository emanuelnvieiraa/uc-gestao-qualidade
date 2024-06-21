import Imovel from '../models/Imovel.js';

export const createService = (body) => Imovel.create(body);

//offset, limit: paginação no banco de dados
//.sort({id: -1}): exibe dos mais recentes aos antigos
//.skip(offset): para não mostrar intens já listados
//.populate("user"): traz infos do user no item
export const findAllService = (offset, limit) => 
Imovel.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

export const countImovel = () => Imovel.countDocuments()

export const findByIdService = (id) => Imovel.findById(id).populate("user")

export const searchByCidadeService = (cidade) => Imovel.find({
    cidade: { $regex: `${cidade || ""}`, $options: "i" },
}).sort({ _id: -1 }).populate("user");;

export const byUserService = (id) => Imovel.find({user: id}).sort({ _id: -1 }).populate("user");

export const updateService = (
    id, 
    cidade, 
    bairro, 
    rua, 
    numero, 
    tipoDeImovel, 
    tipoDeNegocio, 
    atualDisponibilidade, 
    telefoneContato,
    imagemImovel) => 
    Imovel.findOneAndUpdate({ _id: id }, { 
    cidade,
    bairro,
    rua,
    numero,
    tipoDeImovel,
    tipoDeNegocio,
    atualDisponibilidade,
    telefoneContato, 
    imagemImovel }, { rawResult: true })

    export const eraseService = (id) => Imovel.findByIdAndDelete({ _id: id })

test('Editar um imóvel existente', async () => {
    const newImovel = {
      cidade: 'Guanambi',
      bairro: 'Aeroporto Velho',
      rua: 'Rua 1',
      numero: 123,
      tipoDeImovel: 'Casa',
      tipoDeNegocio: 'Aluguel',
      atualDisponibilidade: 'Disponível',
      telefoneContato: 74988252525,
      imagemImovel: 'casa.jpg'
    };

    // Primeiro, criar um novo imóvel
    const createResponse = await request
      .post('/imovel')
      .set('Authorization', `Bearer ${token}`)
      .send(newImovel);

    expect(createResponse.status).toBe(201);
    const createdImovelId = createResponse.body.imovel.id;

    const updatedImovel = {
      cidade: 'Guanambi',
      bairro: 'Aeroporto Novo',
      rua: 'Rua 2',
      numero: 456,
      tipoDeImovel: 'Apartamento',
      tipoDeNegocio: 'Venda',
      atualDisponibilidade: 'Indisponível',
      telefoneContato: 74988252526,
      imagemImovel: 'apartamento.jpg'
    };

    // Atualizar o imóvel criado
    const updateResponse = await request
      .put(`/imovel/${createdImovelId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedImovel);

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body).toHaveProperty('message');
    expect(updateResponse.body.message).toBe('Imóvel atualizado com sucesso!');
  });
