import { response } from 'express';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompanyServiceService } from '../../Services/company-service.service';
import { TypeService } from '../../Services/type.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { ICompany } from '../../Models/ICompany';
import { CommonModule } from '@angular/common';
import { IType } from '../../Models/IType';

@Component({
  selector: 'app-types',
  standalone: true,
  imports:[CommonModule ,FormsModule ,ReactiveFormsModule,RouterLink],
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.css'],
})
export class TypesComponent implements OnInit {
  typeForm: FormGroup;
  companies?: ICompany[];
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
      error: (err) => {
        console.log(err);
      },
    });

    if (this.isUpdate) {
      this._typeService.GetTypeById(this.id).subscribe({
        next: (response) => {
          const companyId = this.companies?.filter(
            (c) => c.name == response.companyName
          )[0]?.id;
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
      });
    }
  }

  editType(): void {
    if (this.typeForm.valid) {
      this._typeService.editType(this.id, this.typeForm.value).subscribe({
        next: () => {
          Swal.fire({
            title: 'Saved Successfully',
            text: 'Do you want to continue',
            icon: 'success',
            confirmButtonText: 'OK',
          });
        },
      });
    }
  }

  isTypeNameDuplicate(control: any): { [key: string]: boolean } | null {
    let existingTypes:IType[] = [];
    this._typeService.getAllTypes().subscribe({
      next: (response) => {
        existingTypes = response;
      }
    });
    if (existingTypes.includes(control.value)) {
      return { duplicate: true };
    }
    return null;
  }

  onCancel(): void {
    this.router.navigateByUrl('/types-list');
  }
}
