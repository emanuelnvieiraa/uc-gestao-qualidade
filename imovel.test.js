import supertest from 'supertest';
import app from '../../index.js';
import { generateToken } from '../services/auth.service.js';

const request = supertest(app);
// Teste listar imóveis
describe('Testes imovel', () => {

  let createdImovelId;
  let token;

  beforeAll(async () => {
    // Gerar token antes dos testes
    const response = await request
      .post('/auth')
      .send({ email: 'ucqualidade@gmail.com', password: 'ucqualidade' });

    token = response.body.token;
  });

  afterAll(async () => {
    // Limpeza: Deletar o imóvel criado durante o teste
    if (createdImovelId) {
      const deleteResponse = await request
        .delete(`/imovel/${createdImovelId}`)
        .set('Authorization', `Bearer ${token}`);

      if (deleteResponse.status !== 204) {
        console.error('Erro ao deletar o imóvel:', deleteResponse.body);
      }
    }
  });

  afterAll(async () => {
    // Limpeza: Deletar o imóvel criado durante o teste
    if (createdImovelId) {
      await request(app)
        .delete(`/imovel/${createdImovelId}`)
        .set('Authorization', `Bearer ${token}`);
    }
  });

  test('listar todos os imoveis', async () => {
    const response = await request.get('/imovel');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.results)).toBe(true);
  });

  test('Buscar imóvel por cidade', async () => {
    const cidade = 'Guanambi';
    const response = await request.get(`/imovel/search?cidade=${cidade}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.results)).toBe(true);
    expect(response.body.results.length).toBeGreaterThan(0);

    const imovel = response.body.results[0];
    expect(imovel.cidade).toBe(cidade);
    expect(imovel).toHaveProperty('bairro');
    expect(imovel).toHaveProperty('rua');
    expect(imovel).toHaveProperty('numero');
    expect(imovel).toHaveProperty('tipoDeImovel');
    expect(imovel).toHaveProperty('tipoDeNegocio');
    expect(imovel).toHaveProperty('atualDisponibilidade');
    expect(imovel).toHaveProperty('telefoneContato');
    expect(imovel).toHaveProperty('imagemImovel');
    expect(imovel).toHaveProperty('dataAnuncio');
})

test('Fazer login e obter token válido', async () => {
  const credentials = {
      email: 'ucqualidade@gmail.com',
      password: 'ucqualidade'
  };

  const response = await request
      .post('/auth')
      .send(credentials);

  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty('token');
  //token = response.body.token; // Atualiza o token para ser usado nos próximos testes
});

test('Criar um novo imóvel', async () => {
  
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
  const token = generateToken('66340937318f22dc10b23a5d');
  const response = await request
      .post('/imovel')
      .set('Authorization', `Bearer ${token}`)
      .send(newImovel);

  expect(response.status).toBe(201);
  expect(response.body.imovel).toHaveProperty('id');
  expect(response.body.imovel.cidade).toBe(newImovel.cidade);
  expect(response.body.imovel.bairro).toBe(newImovel.bairro);
  expect(response.body.imovel.rua).toBe(newImovel.rua);
  expect(response.body.imovel.numero).toBe(newImovel.numero);
  expect(response.body.imovel.tipoDeImovel).toBe(newImovel.tipoDeImovel);
  expect(response.body.imovel.tipoDeNegocio).toBe(newImovel.tipoDeNegocio);
  expect(response.body.imovel.atualDisponibilidade).toBe(newImovel.atualDisponibilidade);
  expect(response.body.imovel.telefoneContato).toBe(newImovel.telefoneContato);
  expect(response.body.imovel.imagemImovel).toBe(newImovel.imagemImovel);

  createdImovelId = response.body.id;
});

test('Erro ao criar um novo imóvel com campos ausentes', async () => {
  const response = await request
    .post('/imovel')
    .send(
      {
        "cidade": "Guanambi",
        "bairro": "aaaa",
        "rua": "aaaa",
        "numero": "99",
        "tipoDeImovel": "Sobrado",
        "tipoDeNegocio": "Venda",
        "atualDisponibilidade": "Disponível",
        "telefoneContato": "77992121051",
        "imagemImovel": "https://pt.m.wikipedia.org/wiki/Ficheiro:Casa_Amarela.jpg"
      
    });
    

})


test('Erro ao criar um novo imóvel com dados já cadastrados', async () => {
  const response = await request
    .post('/imovel')
    .send( {
      "cidade": "Guanambi",
      "bairro": "aaaa",
      "rua": "aaaa",
      "numero": "99",
      "tipoDeImovel": "Sobrado",
      "tipoDeNegocio": "Venda",
      "atualDisponibilidade": "Disponível",
      "telefoneContato": "77992121051",
      "imagemImovel": "https://pt.m.wikipedia.org/wiki/Ficheiro:Casa_Amarela.jpg"
    });
})
})
