import supertest from 'supertest';
import app from '../../index.js'; // caminho para o seu arquivo index.js principal

const request = supertest(app);

describe('Testes de busca por cidade de imóveis', () => {

    test('Buscar imóveis por cidade', async () => {
        const cidade = 'Guanambi';

        // Fazer requisição para buscar imóveis por cidade
        const response = await request
            .get(`/imovel/search?cidade=${cidade}`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.results)).toBe(true);

        // Verificar se pelo menos um imóvel foi encontrado
        expect(response.body.results.length).toBeGreaterThan(0);

        // Verificar se todos os imóveis retornados são da cidade especificada
        response.body.results.forEach(imovel => {
            expect(imovel.cidade.toLowerCase()).toBe(cidade.toLowerCase());
            expect(imovel).toHaveProperty('bairro');
            expect(imovel).toHaveProperty('rua');
            expect(imovel).toHaveProperty('numero');
            expect(imovel).toHaveProperty('tipoDeImovel');
            expect(imovel).toHaveProperty('tipoDeNegocio');
            expect(imovel).toHaveProperty('atualDisponibilidade');
            expect(imovel).toHaveProperty('telefoneContato');
            expect(imovel).toHaveProperty('imagemImovel');
            expect(imovel).toHaveProperty('dataAnuncio');
        });
    });

    test('Buscar imóveis por cidade inexistente', async () => {
        const cidade = 'CidadeInexistente';

        // Fazer requisição para buscar imóveis por cidade inexistente
        const response = await request
            .get(`/imovel/search?cidade=${cidade}`);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Não existe imóveis cadastrados nessa cidade');
    });
});
