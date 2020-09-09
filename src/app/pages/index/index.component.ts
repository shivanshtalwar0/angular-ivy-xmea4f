import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, NG_VALIDATORS, Validators} from '@angular/forms';
import {CustomValidators} from '../../validators/nameValidator';
import {PhoneValidator} from '../../validators/PhoneValidator';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {

  constructor() {
  }

  form: FormGroup;

  submit() {
    if (this.form.valid) {
      console.log('executed')
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(
          this.form.value )
      }).then(response => response.json()).then(data => {
        console.log(data)

        this.form.setValue({name:"",searchBy:"email",searchText:""})
        this.form.reset()


      })

    }
  }

  searchByInputIcon() {
    return this.form.get('searchBy').value === 'email' ? 'email' : 'phone';
  }

  searchByInputLabel() {
    return this.form.get('searchBy').value === 'email' ? 'Email' : 'Phone';
  }

  getNameError(control: AbstractControl): string {
    if (control.hasError('invalidName')) {
      return 'Name must not contain numbers or special symbols!';
    }
    if (control.hasError('required')) {
      return 'Name is Required!';
    }
  }

  getSearchTextError(control: AbstractControl): string {
    if (control.hasError('email')) {
      return 'Invalid Email';
    }
    if (control.hasError('invalidPhone')) {
      return 'Invalid Phone';
    }
    if (control.hasError('required')) {
      return this.searchByInputLabel() + ' is Required!';
    }
  }

  check(evt) {
    //checks and prevents if radio is phone and prevents alphabets and ensure length do not exceed 10 characters
    if (this.form.controls.searchBy.value === 'phone' && (!/^[0-9]$/.test(evt.key) || this.form.controls.searchText.value.length > 9)) {
      evt.preventDefault();
    }
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, CustomValidators.nameValidator]),
      searchBy: new FormControl('email', [Validators.required]),
      searchText: new FormControl('', [Validators.required,Validators.email]),
    });

    this.form.get('searchBy').valueChanges.subscribe((value => {
      this.form.get('searchText').setValue('');
      if (value === 'email') {
        this.form.get('searchText').clearValidators();
        this.form.get('searchText').setValidators([
          Validators.required,
          Validators.email
        ]);
      } else {
        this.form.get('searchText').clearValidators();
        this.form.get('searchText').setValidators([
          Validators.required,
          PhoneValidator.check
        ]);
      }

    }));
  }

}
