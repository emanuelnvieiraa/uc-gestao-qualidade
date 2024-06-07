import supertest from 'supertest';
import app from '../index.js';

const request = supertest(app);

describe('Testes imovel', () => {
  test('listar todos os imoveis', async () => {
    const response = await request.get('/imovel');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.results)).toBe(true);
  });
})

