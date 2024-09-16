import { InvoiceServiceService } from './../../Services/service-invoice.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import{InvoiceServiceService as InvoiceService} from './../../Services/service-invoice.service';
import { IItemInvoice , IInvoice } from '../../Models/IInvoice';

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

  constructor(private fb: FormBuilder, private invoiceService: InvoiceService) {
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
      discount: [''],
      total: ['', Validators.required],
      balance: ['', Validators.required],
    });
  }

  // Method to add the item to the table
  addItem() {
    if (this.itemForm.valid) {
      const item = this.itemForm.value;
      this.addedItems.push(item);
      this.itemForm.reset();
    }
  }

      
}
