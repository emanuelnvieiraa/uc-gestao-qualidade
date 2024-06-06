test("Listar todos os usuários", async() => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.lenght).toBeGreaterThan(0);
});