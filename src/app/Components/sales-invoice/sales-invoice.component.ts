import { InvoiceServiceService } from './../../Services/service-invoice.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IItemInvoice, IInvoice } from '../../Models/IInvoice';

@Component({
  selector: 'app-sales-invoice',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sales-invoice.component.html',
  styleUrls: ['./sales-invoice.component.css'],
})
export class SalesInvoiceComponent {
  salesInvoiceForm: FormGroup;
  itemForm: FormGroup;
  addedItems: Array<IItemInvoice> = [];

  constructor(private fb: FormBuilder, private invoiceService: InvoiceServiceService) {
    // Initialize the form with form groups
    this.salesInvoiceForm = this.fb.group({
      billsDate: ['', Validators.required],
      billsNumber: ['', Validators.required],
      clientName: ['', Validators.required],
      billsTotal: ['', Validators.required],
      percentageDiscount: [''],
      valueDiscount: [''],
      theNet: ['', Validators.required],
      paidUp: ['', Validators.required],
      theRest: ['', Validators.required],
    });

    // Item form
    this.itemForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      unit: ['', Validators.required],
      quantity: ['', Validators.required],
      sellingPrice: ['', Validators.required],
      discount: ['', Validators.required],
      total: ['', Validators.required],
      balance: ['', Validators.required],
    });
  }

  // Add item to the list
  addItem() {
    const item = this.itemForm.value as IItemInvoice;
    this.addedItems.push(item);
    this.itemForm.reset();
  }

  // Submit the form and bundle items with the invoice
  submitForm() {
    if (this.salesInvoiceForm.valid) {
      const invoice: IInvoice = {
        ...this.salesInvoiceForm.value,
        items: this.addedItems,
      };

      this.invoiceService.postInvoice(invoice).subscribe(
        (response) => {
          console.log('Invoice submitted successfully:', response);
          // Optionally to reset the form and item list after submission
          this.salesInvoiceForm.reset();
          this.addedItems = [];
        },
        (error) => {
          console.error('Error submitting invoice:', error);
        }
      );
    }
  }
}
