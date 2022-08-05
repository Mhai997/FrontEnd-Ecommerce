import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-type-form',
  templateUrl: './product-type-form.component.html',
  styleUrls: ['./product-type-form.component.scss']
})
export class ProductTypeFormComponent implements OnInit {
  formulario! : FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  buildForm() {
    this.formulario= this.formBuilder.group({
      id: [null, [Validators.required, Validators.maxLength(4)]],
      name: [null, [Validators.required, Validators.pattern(/^[a-zA-Z0-0-_\s.áéíóúÁÉÍÓÚñÑ]+$/)]]
    });
  }
}
