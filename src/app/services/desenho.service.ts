import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export interface Retangulo {
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


  constructor() { }

  adicionarRetangulo(retangulo: Retangulo) {

    const lista = this.retangulosLista.getValue();
    const novaLista = [...lista, retangulo];
    this.retangulosLista.next(novaLista);
    console.log('novaLista', novaLista);

  }
}


