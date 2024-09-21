import { response } from 'express';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../Services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private loginService: LoginService, private route: Router) {}
  LoginForm: FormGroup = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      //*/
    ]),
    password: new FormControl('', [
      Validators.required,
      //*/
    ]),
  });
  login() {
    if (this.LoginForm.valid) {
      this.loginService.onLogin(this.LoginForm.value).subscribe({
        next: (response) => {
          console.log(response);
          localStorage.setItem('Token', response.token);
          this.route.navigateByUrl('/home');
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      alert('error');
    }
  }
}
