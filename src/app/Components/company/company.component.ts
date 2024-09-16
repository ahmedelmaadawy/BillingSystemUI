import { CompanyServiceService } from './../../Services/company-service.service';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ICompany } from '../../Models/ICompany';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,RouterLink,RouterLinkActive],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css',
})
export class CompanyComponent {
  companies?: ICompany[];

  constructor(
    private _companyService: CompanyServiceService,
    private router: Router
  ) {}

  CompanyForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    note: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(200),
    ]),
  });

  AddCompany() {
    this._companyService.addCompany(this.CompanyForm.value).subscribe({
      next: (response) => {
        alert('Company Saved Successfuly');
        this.router.navigateByUrl('/company-list');
      },
      error: (err) => {
        console.log(this.CompanyForm.value);
        console.log(err);
        alert('Error');
      },
    });
  }
}
