import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [],
})
export class DynamicPageComponent {
  public myForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.formBuilder.array([
      ['Metal Gear', Validators.required],
      ['Guitar Hero', Validators.required],
    ]),
  });

  public newFavorite: FormControl = new FormControl('', [Validators.required]);

  constructor(private formBuilder: FormBuilder) {}

  //getter de ayuda para las validaciones
  isValidField(field: string): boolean | null {
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }

  isValidFieldInArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

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

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);

    //eliminar de la vista los items:
    //forma 1
    //this.favoriteGames.controls = [];
    //forma 2
    (this.myForm.controls['favoriteGames'] as FormArray) =
      this.formBuilder.array([]);

    this.myForm.reset();
  }

  onDelete(index: number): void {
    this.favoriteGames.removeAt(index);
  }

  onAdd(): void {
    if (this.newFavorite.invalid) return;
    //console.log(this.newFavorite.value);
    const newItem = this.newFavorite.value;
    this.favoriteGames.push(
      this.formBuilder.control(newItem, Validators.required)
    );
    this.newFavorite.reset();
  }
}
