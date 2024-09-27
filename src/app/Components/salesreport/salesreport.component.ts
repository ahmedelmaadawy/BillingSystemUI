import { response } from 'express';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceServiceService } from '../../Services/service-invoice.service';
import { IInvoiceReport } from '../../Models/IInvoiceReport';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
    this.reportForm = this.fb.group({
      from: [Validators.required],
      to: [Validators.required],
    });
  }
  getReport() {
    if (this.reportForm.valid) {
      this._reportService
        .getReport(this.reportForm.value.from, this.reportForm.value.to)
        .subscribe({
          next: (response) => {
            this.report = response;
            console.log(response);
            console.log(this.report);
          },
        });
    }
  }
}
