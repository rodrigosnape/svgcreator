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
  retanguloSelecionado: boolean = false;
  

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

        this.retanguloSelecionado = true
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

  editarRetangulo() {
     const retangulo: Retangulo = {
      id: this.retanguloForm.value.idRetangulo,
      tipo: 'retangulo',
      posX: this.retanguloForm.value.posXRetangulo,
      posY: this.retanguloForm.value.posYRetangulo,
      largura: this.retanguloForm.value.larguraRetangulo,
      altura: this.retanguloForm.value.alturaRetangulo,
      curva: this.retanguloForm.value.curvaRetangulo
    };
    this.desenhoService.editarRetangulo(this.retanguloForm.value.idRetangulo, retangulo);

    this.resetarForm();
  }

  removerRetangulo() {
    this.desenhoService.removerRetangulo(this.retanguloForm.value.idRetangulo);
    this.resetarForm();
  }

  resetarForm() {
    this.retanguloForm.reset({
      idRetangulo: '',
      tipo: 'retangulo',
      posXRetangulo: 0,
      posYRetangulo: 0,
      larguraRetangulo: 100,
      alturaRetangulo: 50,
      curvaRetangulo: 0,
    });

    this.retanguloSelecionado = false;

  }



}
