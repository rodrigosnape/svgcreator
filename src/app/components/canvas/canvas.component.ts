import { Component } from '@angular/core';
import { DesenhoService, Retangulo } from '../../services/desenho.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.css'
})
export class CanvasComponent {
  retangulos: Retangulo[] = [];

  constructor(private desenhoService: DesenhoService) {

    this.desenhoService.retangulos$.subscribe((retangulos: Retangulo[]) => {
      this.retangulos = retangulos;
    });

  }

    editarRetangulo(id:string) {
      this.desenhoService.selecionarRetangulo(id);
    }

  }
