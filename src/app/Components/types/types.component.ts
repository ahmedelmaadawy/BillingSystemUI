import { CompanyServiceService } from './../../Services/company-service.service';
import { ICompany } from './../../Models/ICompany';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IType } from '../../Models/IType';
import { TypeService } from '../../Services/type.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-types',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.css'],
})
export class TypesComponent implements OnInit {
  typeForm: FormGroup;
  companies?: ICompany[];
  types?: IType[];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _companyService: CompanyServiceService,
    private _typeService: TypeService
  ) {
    this.typeForm = this.fb.group({
      companyId: ['', Validators.required],
      name: ['', [Validators.required, this.isTypeNameDuplicate.bind(this)]],
      note: [''],
    });
  }
  ngOnInit(): void {
    this._companyService.getAllCompanies().subscribe({
      next: (response) => {
        this.companies = response;
        console.log(this.companies);
      },
      error: (err) => {
        console.log(err);
      },
    });
    this._typeService.getAllTypes().subscribe({
      next: (response) => {
        this.types = response;
        console.log(this.types);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSubmit(): void {
    if (this.typeForm.valid) {
      console.log('Form Submitted:', this.typeForm.value);
      this._typeService.addType(this.typeForm.value).subscribe({
        next: () => {
          Swal.fire({
            title: 'Saved Successfully',
            text: 'Do you want to continue',
            icon: 'success',
            confirmButtonText: 'OK',
          });
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error In Database',
            text: `Something went wrong! name must be unique`,
            footer: '<a href="#">Why do I have this issue?</a>',
          });
        },
      });
    } else {
      console.log('Form Invalid');
    }
  }

  isTypeNameDuplicate(control: any): { [key: string]: boolean } | null {
    const existingTypes = ['Type A', 'Type B'];
    if (existingTypes.includes(control.value)) {
      return { duplicate: true };
    }
    return null;
  }
}
