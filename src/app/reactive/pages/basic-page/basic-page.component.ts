import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

const productoX = {
  name: 'Sustancia X',
  price: 2500,
  inStorage: 24,
};

@Component({
  templateUrl: './basic-page.component.html',
  styles: [],
})
export class BasicPageComponent implements OnInit {
  /*
    Construccion de formulario con FormControl
    public myForm: FormGroup = new FormGroup({
    name: new FormControl('', [], []),
    price: new FormControl(0, [], []),
    inStorage: new FormControl(0, [], []),
  });*/

  public myForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)], []],
    price: [0, [Validators.required, Validators.min(0)], []],
    inStorage: [0, [Validators.required, Validators.min(0)], []],
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    //this.myForm.reset(productoX);
  }

  //getter de ayuda para las validaciones
  isValidField(field: string): boolean | null {
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }
  // basado en un control(line 51)
  getFieldError(field: string): string | null {
    //Si el campo esta y no tiene errores
    if (!this.myForm.controls[field] && !this.myForm.controls[field].errors)
      return null;
    const errores = this.myForm.controls[field].errors || {};
    for (const key of Object.keys(errores)) {
      //console.log(key);
      switch (key) {
        case 'required':
          return 'este campo es requerido';
        case 'minlength':
          return `Mínimo ${errores['minlength'].requiredLength} caracteres`;
      }
    }
    return null;
  }

  onSave(): void {
    if (this.myForm.valid) console.log(this.myForm.value);
    this.myForm.reset({
      price: 0,
      inStorage: 0,
    });

    if (this.myForm.invalid) this.myForm.markAllAsTouched();
  }
}
