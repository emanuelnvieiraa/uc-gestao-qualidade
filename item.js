class atualizarAgenda {
  constructor(tarefa, estado) {
    this._tarefa = tarefa;
    this._estado = estado;
  }

  get tarefa() {
    return this._tarefa;
  }

  get estado() {
    return this._estado;
  }
  
  concluirAtualizacao() {
  if (!this._tarefa || !this._estado) {
    throw new Error('Tarefa e estado são de preenchimento obrigatório');
  } else {
    return { tarefa: this._tarefa, estado: this._estado };
  }
}

}

module.exports = atualizarAgenda;
  
