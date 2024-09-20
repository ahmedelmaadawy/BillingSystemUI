import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  LoginForm:FormGroup=new FormGroup({
    userName: new FormControl ('',[
      Validators.required,
          //*/

    ]),
    password: new FormControl ('',[
      Validators.required,
      //*/
    ])
  })
}


