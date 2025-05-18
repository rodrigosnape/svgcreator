import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export interface Retangulo {
  id: string;
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

export interface Estrela {
  id:string;
  tipo: 'estrela';
  posX: number;
  posY: number;
  raioInterno: number;
  raioExterno: number;
  quantPontas: number;
  profundidade: number;
  pontos: string;
  cor: string;
  borda: string;
  espessura: number;
}
  
  

@Injectable({
  providedIn: 'root'
})


export class DesenhoService {

  private retangulosLista = new BehaviorSubject<Retangulo[]>([]);
  private estrelasLista = new BehaviorSubject<Estrela[]>([]);

  public retangulos$ = this.retangulosLista.asObservable();
  public estrelas$ = this.estrelasLista.asObservable();

  private retanguloSelecionado = new BehaviorSubject<Retangulo | null>(null);
  private estrelaSelecionada = new BehaviorSubject<Estrela | null>(null);
  
  public retanguloSelecionado$ = this.retanguloSelecionado.asObservable();
  public estrelaSelecionada$ = this.estrelaSelecionada.asObservable();


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

  adicionarEstrela(estrela: Estrela){
    estrela.id = Math.random().toString(36).substring(2, 9);
    estrela.pontos = this.gerarPontosEstrela(estrela);
    const lista = this.estrelasLista.getValue();
    const novaLista = [...lista, estrela];
    this.estrelasLista.next(novaLista);
    console.log('novaLista', novaLista);
  }

  gerarPontosEstrela(estrela: Estrela):string {

    const pontos: string[] = [];
    const anguloInicial = -Math.PI / 2;
    const totalPontos = estrela.quantPontas * 2;

    for (let i = 0; i < totalPontos; i++) {
      const angulo = anguloInicial + (i * Math.PI) / estrela.quantPontas;
      const raio = i % 2 === 0 ? estrela.raioExterno : estrela.raioInterno;
      const x = estrela.posX + raio * Math.cos(angulo);
      const y = estrela.posY + raio * Math.sin(angulo);
      pontos.push(`${x},${y}`);
    }


    //const pontos = "150,50 179.4,111.8  247.6,119.1 195.5,168.2 207.1,236.5 150,200 92.9,236.5 104.5,168.2 52.4,119.1 120.6,111.8";
    return pontos.join(' ');
  }

  selecionarRetangulo(id: string) {
    const encontrado = this.retangulosLista.getValue().find(r => r.id === id);
    if (encontrado) {
      this.retanguloSelecionado.next(encontrado);
      console.log('retanguloSelecionado', id);
    }
  }

  selecionarEstrela(id: string) {
      const encontrada = this.estrelasLista.getValue().find(r => r.id === id);
    if (encontrada) {
      this.estrelaSelecionada.next(encontrada);
      console.log('estrelaSelecionada', id);
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

  editarEstrela(id: string, novosDados: Estrela){
    const lista = this.estrelasLista.getValue();
    const index = lista.findIndex(r => r.id === id);

    if (index !== -1) {
      const estrelaAtualizada = {
        ...lista[index],
        posX: novosDados.posX,
        posY: novosDados.posY,
        raioInterno: novosDados.raioInterno,
        raioExterno: novosDados.raioExterno,
        quantPontas: novosDados.quantPontas,
        profundidade: novosDados.profundidade,
        pontos: novosDados.pontos,
        cor: novosDados.cor,
        borda: novosDados.borda,
        espessura: novosDados.espessura
      };

      //É necessário gerar os pontos novamente
      estrelaAtualizada.pontos = this.gerarPontosEstrela(estrelaAtualizada);

      const novaLista = [...lista];
      novaLista[index] = estrelaAtualizada;

      this.estrelasLista.next(novaLista);
      this.estrelaSelecionada.next(estrelaAtualizada);

      console.log('estrelaEditada', estrelaAtualizada);
    }
  }



  removerRetangulo(id: string) {
    const listaAtual = this.retangulosLista.getValue();
    const novaLista = listaAtual.filter(r => r.id !== id);

    this.retangulosLista.next(novaLista);

    this.retanguloSelecionado.next(null);
  }

  removerEstrela(id: string) {
    const listaAtual = this.estrelasLista.getValue();
    const novaLista = listaAtual.filter(r => r.id !== id);

    this.estrelasLista.next(novaLista);

    this.estrelaSelecionada.next(null);
  }
}


