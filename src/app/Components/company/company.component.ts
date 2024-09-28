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
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    CommonModule,
  ],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css',
})
export class CompanyComponent implements OnInit {
  companies?: ICompany[];
  id: number = 0;
  isUpdate: boolean = false;
  constructor(
    private _companyService: CompanyServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = Number(params['id']);
      console.log(this.id);
    });
    this.isUpdate = this.id != 0;
    if (this.isUpdate) {
      this._companyService.GetCompanyById(this.id).subscribe({
        next: (response) => {
          this.CompanyForm.patchValue({
            name: response.name,
            note: response.note,
          });
        },
        error: (err) => {
          alert(err);
        },
      });
    }
  }

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
    if (this.CompanyForm.valid) {
      this._companyService.addCompany(this.CompanyForm.value).subscribe({
        next: (response) => {
          Swal.fire({
            title: 'Company Saved Successfully',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          this.router.navigateByUrl('/company-list');
        },
      });
    }
  }
  editCompany() {
    if (this.CompanyForm.valid) {
      this._companyService
        .editCompany(this.id, this.CompanyForm.value)
        .subscribe({
          next: (response: any) => {
            Swal.fire({
              title: 'Company Updated Successfully',
              icon: 'success',
              confirmButtonText: 'OK',
            });
            this.router.navigateByUrl('/company-list');
          },
        });
    }
  }
}
