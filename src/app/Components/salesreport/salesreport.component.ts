import { response } from 'express';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceServiceService } from '../../Services/service-invoice.service';
import { IInvoiceReport } from '../../Models/IInvoiceReport';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './salesreport.component.html',
  styleUrls: ['./salesreport.component.css'],
})
export class SalesreportComponent {
  report: IInvoiceReport[] = [];
  reportForm: FormGroup;
  constructor(
    private _reportService: InvoiceServiceService,
    private fb: FormBuilder
  ) {
   this.reportForm = this.fb.group(
     {
       from: [null, Validators.required],
       to: [null, Validators.required],
     },
     { validators: this.dateRangeValidator() }
   );
  }
  getReport() {
    if (this.reportForm.valid) {
      this._reportService
        .getReport(this.reportForm.value.from, this.reportForm.value.to)
        .subscribe({
          next: (response) => {
            this.report = response;
          },
        });
    }
  }
   dateRangeValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const fromDate = group.get('from')?.value;
    const toDate = group.get('to')?.value;

    // Check if both dates are provided
    if (fromDate && toDate) {
      // Compare dates
      if (new Date(fromDate) >= new Date(toDate)) {
        return { dateRangeInvalid: true };  // Return error if 'from' date is greater or equal to 'to' date
      }
    }
    return null;  // Return null if validation passes
  };
}
}
