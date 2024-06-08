import supertest from 'supertest';
import app from '../index.js';

const request = supertest(app);

// Teste listar imóveis
describe('Testes imovel', () => {
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

})

