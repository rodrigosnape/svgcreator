import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DesenhoService, Estrela, Retangulo } from '../../services/desenho.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {

  retanguloForm!: FormGroup;

  retanguloSelecionado: boolean = false;

  abaSelecionada: string = 'estrela';


  estrelaForm!: FormGroup;
  estrelaSelecionada: boolean = false;
  

  constructor(private desenhoService: DesenhoService) {}

  ngOnInit(): void {
    this.retanguloForm = new FormGroup({
        idRetangulo: new FormControl,
        posXRetangulo: new FormControl(0, Validators.required),
        posYRetangulo: new FormControl(0, Validators.required),
        larguraRetangulo: new FormControl(100, Validators.required),
        alturaRetangulo: new FormControl(50, Validators.required),
        curvaRetangulo: new FormControl(0, Validators.required),
        corRetangulo: new FormControl(0, Validators.required),
        bordaRetangulo: new FormControl(0, Validators.required),
        espessuraRetangulo: new FormControl(0, Validators.required),
    });

    this.estrelaForm = new FormGroup({
        idEstrela: new FormControl,
        posXEstrela: new FormControl(0, Validators.required),
        posYEstrela: new FormControl(0, Validators.required),
        quantPontasEstrela: new FormControl(5, Validators.required),
        raioInternoEstrela: new FormControl(50, Validators.required),
        raioExternoEstrela: new FormControl(100, Validators.required),
        profundidadeEstrela: new FormControl(0, Validators.required),
        corEstrela: new FormControl(0, Validators.required),
        bordaEstrela: new FormControl(0, Validators.required),
        espessuraEstrela: new FormControl(0, Validators.required),
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
          corRetangulo: ret.cor,
          bordaRetangulo: ret.borda,
          espessuraRetangulo: ret.espessura

        });

        this.retanguloSelecionado = true
      }      
    });

    this.desenhoService.posicaoInicial$.subscribe(pos => {
      this.retanguloForm.patchValue({
        posXRetangulo: pos.x,
        posYRetangulo: pos.y
      });
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
      curva: this.retanguloForm.value.curvaRetangulo,
      cor: this.retanguloForm.value.corRetangulo,
      borda: this.retanguloForm.value.bordaRetangulo,
      espessura: this.retanguloForm.value.espessuraRetangulo
    };

    this.desenhoService.adicionarRetangulo(retangulo);
  }

  adicionarEstrela() {
    const estrela: Estrela = {
      id: '',
      tipo: 'estrela',
      posX: this.estrelaForm.value.posXEstrela,
      posY: this.estrelaForm.value.posYEstrela,
      raioInterno: this.estrelaForm.value.raioInternoEstrela,
      raioExterno: this.estrelaForm.value.raioExternoEstrela,
      quantPontas: this.estrelaForm.value.quantPontasEstrela,
      profundidade: this.estrelaForm.value.profundidadeEstrela,
      pontos: '',
      cor: this.estrelaForm.value.corEstrela,
      borda: this.estrelaForm.value.bordaEstrela,
      espessura: this.estrelaForm.value.espessuraEstrela
    }

    this.desenhoService.adicionarEstrela(estrela);
  }

  editarRetangulo() {
     const retangulo: Retangulo = {
      id: this.retanguloForm.value.idRetangulo,
      tipo: 'retangulo',
      posX: this.retanguloForm.value.posXRetangulo,
      posY: this.retanguloForm.value.posYRetangulo,
      largura: this.retanguloForm.value.larguraRetangulo,
      altura: this.retanguloForm.value.alturaRetangulo,
      curva: this.retanguloForm.value.curvaRetangulo,
      cor: this.retanguloForm.value.corRetangulo,
      borda: this.retanguloForm.value.bordaRetangulo,
      espessura: this.retanguloForm.value.espessuraRetangulo
    };
    this.desenhoService.editarRetangulo(this.retanguloForm.value.idRetangulo, retangulo);

    this.resetarForm();
  }

  editarEstrela() {}

  removerRetangulo() {
    this.desenhoService.removerRetangulo(this.retanguloForm.value.idRetangulo);
    this.resetarForm();
  }

  removerEstrela(){}

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

    selecionarAba(aba: 'retangulo' | 'estrela') {
    this.abaSelecionada = aba;
  }



}
