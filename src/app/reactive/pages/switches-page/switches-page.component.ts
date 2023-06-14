import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: [],
})
export class SwitchesPageComponent implements OnInit {
  public myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantNotifications: [true, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue],
  });

  public person = {
    gender: 'F',
    wantNotifications: false,
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.myForm.reset(this.person);
  }

  onSave() {
    if (this.myForm.invalid) {
      return;
    }
    /*console.log(this.myForm.value);
    this.person = this.myForm.value;
    console.log(this.person);*/

    //no quiero que en persona me quede guardado en el backend el campo termsAndConditions
    const { termsAndConditions, ...newPerson } = this.myForm.value;
    this.person = newPerson;
    console.log(this.person);
  }
  //Validaciones:

  isValidField(field: string): boolean {
    return (
      this.myForm.controls[field].value == false &&
      this.myForm.controls[field].pristine == false
    );
  }
}
