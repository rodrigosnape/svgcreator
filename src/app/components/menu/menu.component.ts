import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DesenhoService, Retangulo } from '../../services/desenho.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {

  retanguloForm!: FormGroup;
  formBuilder: any;

  constructor(private desenhoService: DesenhoService) {}

  ngOnInit(): void {
    this.retanguloForm = new FormGroup({
        idRetangulo: new FormControl,
        posXRetangulo: new FormControl(0, Validators.required),
        posYRetangulo: new FormControl(0, Validators.required),
        larguraRetangulo: new FormControl(100, Validators.required),
        alturaRetangulo: new FormControl(50, Validators.required),
        curvaRetangulo: new FormControl(0, Validators.required),
    });


    this.desenhoService.retanguloSelecionado$.subscribe(ret => {
      if (ret) {
        this.retanguloForm.patchValue({
          idRetangulo: ret.id,
          posXRetangulo: ret.posX,
          posYRetangulo: ret.posY,
          larguraRetangulo: ret.largura,
          alturaRetangulo: ret.altura,
          curvaRetangulo: ret.curva,
        });
      }
    });

  }

  adicionarRetangulo() {
      const retangulo: Retangulo = {
      id: '',
      tipo: 'retangulo',
      posX: this.retanguloForm.value.posXRetangulo,
      posY: this.retanguloForm.value.posYRetangulo,
      largura: this.retanguloForm.value.larguraRetangulo,
      altura: this.retanguloForm.value.alturaRetangulo,
      curva: this.retanguloForm.value.curvaRetangulo
    };

    this.desenhoService.adicionarRetangulo(retangulo);
  }

  removerRetangulo() {
    this.desenhoService.removerRetangulo(this.retanguloForm.value.idRetangulo);

  }



}
