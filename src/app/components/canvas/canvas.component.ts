import { Component } from '@angular/core';
import { DesenhoService, Retangulo, Estrela } from '../../services/desenho.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.css'
})
export class CanvasComponent {
  retangulos: Retangulo[] = [];
  estrelas: Estrela[] = [];

  elementoSelecionado: HTMLElement | null = null;

  constructor(private desenhoService: DesenhoService) {

    this.desenhoService.retangulos$.subscribe((retangulos: Retangulo[]) => {
      this.retangulos = retangulos;
    });

      this.desenhoService.estrelas$.subscribe((estrelas: Estrela[]) => {
      this.estrelas = estrelas;
    });

  }

    //Tem que pegar o event para BLOQUEAR o pegarPosicao
    //Se não bloquear, SEMPRE vai mudar a posição (no menu) do retângulo selecionado
    editarRetangulo(event:Event,id:string) {
      event.stopPropagation();
      this.desenhoService.selecionarRetangulo(id);

       this.elementoSelecionado?.classList.remove('selecionado');

      this.elementoSelecionado = event.target as HTMLElement; 

      this.elementoSelecionado.classList.add('selecionado');
    }

    editarEstrela(event:Event,id:string) {
      event.stopPropagation();
      this.desenhoService.selecionarEstrela(id);

      this.elementoSelecionado?.classList.remove('selecionado');

      this.elementoSelecionado = event.target as HTMLElement; 

      this.elementoSelecionado.classList.add('selecionado');

      console.log(event.target);
    }

    pegarPosicao(event: MouseEvent) {
      const canvas = event.target as HTMLCanvasElement;
      const rect = canvas.getBoundingClientRect();
      const x = Math.floor(event.clientX - rect.left);
      const y = Math.floor(event.clientY - rect.top);
      console.log(x,y);

      this.desenhoService.posicaoInicial.next({ x, y });
      return { x, y };
    }

    limparTela(){
      this.desenhoService.limparTela();
      this.elementoSelecionado?.classList.remove('selecionado');
    }

  }
