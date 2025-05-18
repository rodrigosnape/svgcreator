import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export interface Retangulo {
  id: string,
  tipo: 'retangulo';
  posX: number;
  posY: number;
  largura: number;
  altura: number;
  curva: number;
  cor: string;
  borda: string;
  espessura: number;
}

@Injectable({
  providedIn: 'root'
})


export class DesenhoService {

  private retangulosLista = new BehaviorSubject<Retangulo[]>([]);

  public retangulos$ = this.retangulosLista.asObservable();

  private retanguloSelecionado = new BehaviorSubject<Retangulo | null>(null);
  
  public retanguloSelecionado$ = this.retanguloSelecionado.asObservable();


  public posicaoInicial = new BehaviorSubject<{ x: number, y: number }>({ x: 0, y: 0 });
  public posicaoInicial$ = this.posicaoInicial.asObservable();


  constructor() { }

  adicionarRetangulo(retangulo: Retangulo) {

    retangulo.id = Math.random().toString(36).substring(2, 9);
    const lista = this.retangulosLista.getValue();
    const novaLista = [...lista, retangulo];
    this.retangulosLista.next(novaLista);
    console.log('novaLista', novaLista);

  }

  selecionarRetangulo(id: string) {
    const encontrado = this.retangulosLista.getValue().find(r => r.id === id);
    if (encontrado) {
      this.retanguloSelecionado.next(encontrado);
      console.log('retanguloSelecionado', id);
    }
  }

  resetarRetanguloSelecionado() {
    console.log(this.retanguloSelecionado);
    this.retanguloSelecionado.next(null);
    console.log(this.retanguloSelecionado);
  }

  

editarRetangulo(id: string, novosDados: Retangulo) {
  const lista = this.retangulosLista.getValue();
  const index = lista.findIndex(r => r.id === id);

  if (index !== -1) {
    const retanguloAtualizado = {
      ...lista[index],
      posX: novosDados.posX,
      posY: novosDados.posY,
      largura: novosDados.largura,
      altura: novosDados.altura,
      curva: novosDados.curva,
      cor: novosDados.cor,
      borda: novosDados.borda,
      espessura: novosDados.espessura
    };

    const novaLista = [...lista];
    novaLista[index] = retanguloAtualizado;

    this.retangulosLista.next(novaLista);
    this.retanguloSelecionado.next(retanguloAtualizado);

    console.log('retanguloEditado', retanguloAtualizado);
  }
}



  removerRetangulo(id: string) {
    const listaAtual = this.retangulosLista.getValue();
    const novaLista = listaAtual.filter(r => r.id !== id);

    this.retangulosLista.next(novaLista);

    this.retanguloSelecionado.next(null);
  }
}


