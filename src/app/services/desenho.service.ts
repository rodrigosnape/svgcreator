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
}

@Injectable({
  providedIn: 'root'
})


export class DesenhoService {

  private retangulosLista = new BehaviorSubject<Retangulo[]>([]);

  public retangulos$ = this.retangulosLista.asObservable();

  private retanguloSelecionado = new BehaviorSubject<Retangulo | null>(null);
  
  public retanguloSelecionado$ = this.retanguloSelecionado.asObservable();


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

  

  editarRetangulo(id: string, retangulo: Retangulo) {
  }

  removerRetangulo(id: string) {
    const listaAtual = this.retangulosLista.getValue();
    const novaLista = listaAtual.filter(r => r.id !== id);

    this.retangulosLista.next(novaLista);
  }
}


