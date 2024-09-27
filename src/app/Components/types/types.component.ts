import { CompanyServiceService } from './../../Services/company-service.service';
import { ICompany } from './../../Models/ICompany';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { IType } from '../../Models/IType';
import { TypeService } from '../../Services/type.service';
import Swal from 'sweetalert2';
import { noop } from 'rxjs';

@Component({
  selector: 'app-types',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.css'],
})
export class TypesComponent implements OnInit {
  typeForm: FormGroup;
  companies?: ICompany[];
  types?: IType[];
  id: number = 0;
  isUpdate: boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
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
    this.route.params.subscribe((params) => {
      this.id = Number(params['id']);
    });
    this.isUpdate = this.id != 0;

    this._companyService.getAllCompanies().subscribe({
      next: (response) => {
        this.companies = response;
      },
      error: (err) => {},
    });
    if (this.isUpdate) {
      this._typeService.GetTypeById(this.id).subscribe({
        next: (response) => {
          console.log(response);
          let companyId = this.companies?.filter(
            (c) => c.name == response.companyName
          )[0].id;
          this.typeForm.patchValue({
            companyId: companyId,
            name: response.name,
            note: response.note,
          });
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
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
          this.router.navigateByUrl('/types-list');
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error In Database',
            text: `Something went wrong! name must be unique`,
            confirmButtonText: 'OK',
          });
        },
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'In Valid form',
        confirmButtonText: 'OK',
      });
    }
  }
  editType(): void {
    // if (this.typeForm.valid) {
    console.log(this.typeForm.value);
    this._typeService.editType(this.id, this.typeForm.value).subscribe({
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
          confirmButtonText: 'OK',
        });
        console.log(err);
      },
    });
    // } else {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'In Valid form',
    //     confirmButtonText: 'OK',
    //   });
    // }
  }
  isTypeNameDuplicate(control: any): { [key: string]: boolean } | null {
    const existingTypes = ['Type A', 'Type B'];
    if (existingTypes.includes(control.value)) {
      return { duplicate: true };
    }
    return null;
  }
}
