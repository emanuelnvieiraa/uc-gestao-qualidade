import supertest from 'supertest';
import app from '../index.js';
import { getMaxListeners } from 'supertest/lib/test.js';

const request = supertest(app);

describe('Testes user', () => {

let userId;

  test('Listar todos os usuários', async () => {
    const response = await request.get('/user');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0); // Verifica se a lista não está vazia
  });

  test('Criar uma novo user', async () => {

    const uniqueUsername = `evertonX_${Date.now()}`; // Gera um nome de usuário único

    const response = await request
      .post('/user')
      .send({
        name: 'evertonX',
        username: uniqueUsername,
        email: `${uniqueUsername}@gmail.com`,
        password: "evertonX",
        avatar: "evertonX.jpg",
        background: "evertonX.jpg"
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Usuário criado com sucesso");
    expect(response.body.user.name).toBe("evertonX");
    expect(response.body.user.username).toBe(uniqueUsername);
    expect(response.body.user.email).toBe(`${uniqueUsername}@gmail.com`);
    expect(response.body.user.avatar).toBe("evertonX.jpg");
    expect(response.body.user.background).toBe("evertonX.jpg");
    userId = response.body.user.id;
  });
})

