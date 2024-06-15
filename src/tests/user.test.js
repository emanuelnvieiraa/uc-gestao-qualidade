import supertest from 'supertest';
import app from '../../index.js';
import { getMaxListeners } from 'supertest/lib/test.js';

const request = supertest(app);

//Testes listar users e criar user

describe('Testes user', () => {

let userId;

afterEach(async () => {
  // Remove o usuário criado após cada teste
  if (userId) {
    await request.delete(`/user/${userId}`);
    userId = null; // Resetar userId para garantir que não haja interferência em outros testes
  }
});

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

  test('Erro ao criar um novo usuário com dados já cadastrados', async () => {
    const response = await request
      .post('/user')
      .send({
        name: 'evertonX',
        username: 'evertonX', // username existenet
        email: `evertonX@gmail.com`, // email existente
        password: "evertonX",
        avatar: "evertonX.jpg",
        background: "evertonX.jpg"
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Erro ao criar usuário');
  });

  test('Erro ao criar um novo usuário com campos ausentes', async () => {
    const response = await request
      .post('/user')
      .send({
        name: 'evertonX',
        password: "evertonX",
        avatar: "evertonX.jpg",
        background: "evertonX.jpg"
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Por favor, preencha todos os campos!');
  });
})