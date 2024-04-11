const Item = require('./item.js');

describe('Testes dos itens', () => {
  it('Deve ter 2 campos: nome e estado', () => {
    const item = new Item('Ir para a academia','Concluída');

    expect(item.nome).toBe('Ir para a academia');
    expect(item.valor).toBe('Concluída');
   
  });

  it('Deve ter os dois valores declarados caso não tiver apresentar um erro', () => {
    const item = new Item('Ir para a academia', '');

    expect(new Set(Item)).toContain('Concluída');
  });
});

/*
const AtualizarAgenda = require('./item.js');

describe('Testes dos itens na atualização da agenda', () => {
  it('Deve ter 2 campos: nome e estado', () => {
    const novoItem = new AtualizarAgenda('Ir para a academia','Concluída');

    expect(novoItem.tarefa).toBe('Ir para a academia');
    expect(novoItem.estado).toBe('Concluída');
  });

  describe('Testes da atualização com falha', () => {
    it('Deve retornar erro quando um ou ambos os itens não forem fornecidos', () => {
      const primeiroItem = new AtualizarAgenda('Alimentar gatos às 10');

      expect(() => primeiroItem.concluirAtualizacao()).toThrowError('Tarefa e estado são de preenchimento obrigatório');
    });
  });
});

*/
