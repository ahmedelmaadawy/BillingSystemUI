import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sales-invoice',
  standalone: true,
  imports: [ReactiveFormsModule], 
  templateUrl: './sales-invoice.component.html',
  styleUrls: ['./sales-invoice.component.css']
})
export class SalesInvoiceComponent {

  requestForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.requestForm = this.fb.group({
      employeeName: [''],
      date: [''],
      startTime: [''],
      endTime: ['']
    });
  }

  onSave() {
    
  }

  resetForm() {
    this.requestForm.reset();
  }
}
