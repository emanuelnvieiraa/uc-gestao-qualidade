const taskList = [
    'tomar café',
    'ir para a academia',
    'almoçar',
    'ir para o estágio',
    'ir para a faculdade',
  ];
  
  test('a lista de tarefas tem jogar nela', () => {
    expect(taskList).toContain('jogar');
    expect(new Set(taskList)).toContain('jogar');
  });
  test('a lista de tarefas tem almoçar nela', () => {
    expect(taskList).toContain('almoçar');
    expect(new Set(taskList)).toContain('almoçar');
  });