test("Listar todos os imóveis", async() => {
    const response = await request(app).get('/imovel');
    expect(response.status).toBe(200);
    expect(response.body.lenght).toBeGreaterThan(0);
});