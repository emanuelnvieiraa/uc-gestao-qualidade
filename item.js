class Item {
    constructor(nome, estado) {
      this.nome = nome;
      this.estado = estado;
    
    }
  
    somaTotalItens() {
      return this.nome * this.estado;
    }
  }
  
  module.exports = Item;
  