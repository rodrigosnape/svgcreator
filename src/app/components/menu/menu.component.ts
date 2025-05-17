import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {

  retanguloForm!: FormGroup;
  formBuilder: any;

  constructor() {}

  ngOnInit(): void {
this.retanguloForm = new FormGroup({
      posXRetangulo: new FormControl(0, Validators.required),
      posYRetangulo: new FormControl(0, Validators.required),
      larguraRetangulo: new FormControl(100, Validators.required),
      alturaRetangulo: new FormControl(50, Validators.required),
      curvaRetangulo: new FormControl(0, Validators.required),
    });
  }

  adicionarRetangulo() {
    console.log(this.retanguloForm.value);
  }



}
