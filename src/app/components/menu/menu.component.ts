import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DesenhoService, Estrela, Retangulo } from '../../services/desenho.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {

  abaSelecionada: string = 'estrela';
  
  retanguloForm!: FormGroup;
  retanguloSelecionado: boolean = false;

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
        corRetangulo: new FormControl("#0B9827", Validators.required),
        bordaRetangulo: new FormControl("#000000", Validators.required),
        espessuraRetangulo: new FormControl(3, Validators.required),
    });

    this.estrelaForm = new FormGroup({
        idEstrela: new FormControl,
        posXEstrela: new FormControl(50, Validators.required),
        posYEstrela: new FormControl(50, Validators.required),
        quantPontasEstrela: new FormControl(5, Validators.required),
        raioInternoEstrela: new FormControl(50, Validators.required),
        raioExternoEstrela: new FormControl(100, Validators.required),
        profundidadeEstrela: new FormControl(0, Validators.required),
        corEstrela: new FormControl("#DED717", Validators.required),
        bordaEstrela: new FormControl("#000000", Validators.required),
        espessuraEstrela: new FormControl(3, Validators.required),
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
        this.abaSelecionada = 'retangulo';
        this.retanguloSelecionado = true
      }      
    });

    this.desenhoService.estrelaSelecionada$.subscribe(est => {
      if (est) {
        this.estrelaForm.patchValue({
          idEstrela: est.id,
          posXEstrela: est.posX,
          posYEstrela: est.posY,
          quantPontasEstrela: est.quantPontas,
          raioInternoEstrela: est.raioInterno,
          raioExternoEstrela: est.raioExterno,
          profundidadeEstrela: est.profundidade,
          corEstrela: est.cor,
          bordaEstrela: est.borda,
          espessuraEstrela: est.espessura
        });

        this.abaSelecionada = 'estrela';
        this.estrelaSelecionada = true;
      }
    });

    this.desenhoService.posicaoInicial$.subscribe(pos => {
      this.retanguloForm.patchValue({
        posXRetangulo: pos.x,
        posYRetangulo: pos.y
      });

      this.estrelaForm.patchValue({
        posXEstrela: pos.x,
        posYEstrela: pos.y
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

    this.resetarForm('retangulo');
  }

  editarEstrela() {
    const estrela: Estrela = {
      id: this.estrelaForm.value.idEstrela,
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
    this.desenhoService.editarEstrela(this.estrelaForm.value.idEstrela, estrela);
    this.resetarForm('estrela');
  }

  removerRetangulo() {
    this.desenhoService.removerRetangulo(this.retanguloForm.value.idRetangulo);
    this.resetarForm('retangulo');
  }

  removerEstrela(){
    this.desenhoService.removerEstrela(this.estrelaForm.value.idEstrela);
    this.resetarForm('estrela');
  }

  resetarForm(qual:string = '') {
    
    switch (qual) {
      case 'retangulo':
        this.retanguloForm.reset({
          idRetangulo: '',
          tipo: 'retangulo',
          posXRetangulo: 0,
          posYRetangulo: 0,
          larguraRetangulo: 100,
          alturaRetangulo: 50,
          curvaRetangulo: 0,
          corRetangulo: '#0B9827',
          bordaRetangulo: '#000000',
          espessuraRetangulo: 3,
        });
        this.retanguloSelecionado = false;
      break;
      case 'estrela':
        this.estrelaForm.reset({
          idEstrela: '',
          tipo: 'estrela',
          posXEstrela: 50,
          posYEstrela: 50,
          raioInternoEstrela: 50,
          raioExternoEstrela: 100,
          quantPontasEstrela: 5,
          corEstrela: '#DED717',
          bordaEstrela: '#000000',
          profundidadeEstrela: 0,
          espessuraEstrela: 3,
        });
        this.estrelaSelecionada = false;
      break;   
      }
    }
    
    selecionarAba(aba: 'retangulo' | 'estrela') {
      this.abaSelecionada = aba;
    }





}
