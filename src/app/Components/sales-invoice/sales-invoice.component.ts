import { ItemService } from './../../Services/item.service';
import { response } from 'express';
import { InvoiceServiceService } from './../../Services/service-invoice.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { IItemInvoice, IInvoice } from '../../Models/IInvoice';
import { IClient } from '../../Models/IClient';
import { ClientService } from '../../Services/client.service';
import { IItem } from '../../Models/IItem';

@Component({
  selector: 'app-sales-invoice',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sales-invoice.component.html',
  styleUrls: ['./sales-invoice.component.css'],
})
export class SalesInvoiceComponent implements OnInit {
  salesInvoiceForm: FormGroup;
  itemForm: FormGroup;
  addedItems: Array<IItemInvoice> = [];
  clients?: IClient[];
  items?: IItem[];
  // item?: IItemInvoice[];

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceServiceService,
    private _clientService: ClientService,
    private _itemService: ItemService
  ) {
    this.salesInvoiceForm = this.fb.group({
      billsNumber: [{ value: '', disabled: true }, Validators.required],
      clientName: ['', Validators.required],
      billsTotal: [{ value: '', disabled: true }, Validators.required],
      discountPercentage: ['', [Validators.min(0)]],
      discountValue: ['', [Validators.min(0)]],
      net: [{ value: '', disabled: true }, Validators.required],
      paidUp: ['', [Validators.required, Validators.min(0)]],
      theRest: [{ value: '', disabled: true }, Validators.required],
    });

    this.itemForm = this.fb.group({
      item: [null, Validators.required],
      quantity: ['', [Validators.required, positiveQuantity]],
      sellingPrice: [{ value: '' }, Validators.required],
      total: [{ value: '', disabled: true }, Validators.required],
    });
  }

  ngOnInit(): void {
    this.generateBillNumber();

    this._clientService.GetClients().subscribe({
      next: (response) => (this.clients = response),
    });

    this._itemService.getAllItems().subscribe({
      next: (response) => (this.items = response),
    });

    this.itemForm.get('quantity')?.valueChanges.subscribe(() => {
      this.calculateTotal();
    });

    this.itemForm.get('sellingPrice')?.valueChanges.subscribe(() => {
      this.calculateTotal();
    });
    this.salesInvoiceForm.get('paidUp')?.valueChanges.subscribe(() => {
      this.calculateRest();
    });
    this.salesInvoiceForm
      .get('discountPercentage')
      ?.valueChanges.subscribe(() => {
        this.calculateNet();
      });
    this.salesInvoiceForm.get('discountValue')?.valueChanges.subscribe(() => {
      this.calculateNet();
    });
  }

  generateBillNumber() {
    const randomBillNumber = Math.floor(Math.random() * 1000000);
    this.salesInvoiceForm.get('billsNumber')?.setValue(randomBillNumber);
  }

  calculateTotal() {
    const quantity = this.itemForm.get('quantity')?.value || 0;
    const sellingPrice = this.itemForm.get('sellingPrice')?.value || 0;
    const total = quantity * sellingPrice;
    this.itemForm.get('total')?.setValue(total);
  }
  addItem() {
    const item = this.itemForm.getRawValue() as IItemInvoice;
    this.addedItems.push(item);
    this.itemForm.reset();
    this.calculateBillsTotal();
  }

  onItemSelected() {
    const selectedItem = this.itemForm.get('item')?.value;
    if (selectedItem) {
      this.itemForm.get('sellingPrice')?.setValue(selectedItem.sellingPrice);
    }
  }

  submitForm() {
    if (this.salesInvoiceForm.valid) {
      const invoice: IInvoice = {
        ...this.salesInvoiceForm.value,
        items: this.addedItems,
      };
      console.log(invoice);
      this.invoiceService.postInvoice(invoice).subscribe(
        (response) => {
          console.log('Invoice submitted successfully:', response);
          this.salesInvoiceForm.reset();
          this.addedItems = [];
        },
        (error) => {
          console.error('Error submitting invoice:', error);
        }
      );
    } else {
      console.log(this.salesInvoiceForm.errors);
      alert('Form is invalid');
    }
  }
  calculateBillsTotal() {
    const total = this.addedItems.reduce((acc, item) => acc + item.total, 0);
    this.salesInvoiceForm.get('billsTotal')?.setValue(total);
  }
  calculateNet() {
    const billsTotal = this.salesInvoiceForm.get('billsTotal')?.value;
    const discountPercentage =
      this.salesInvoiceForm.get('discountPercentage')?.value || 0;
    const discountValue =
      this.salesInvoiceForm.get('discountValue')?.value || 0;

    const discountAmount = (discountPercentage / 100) * billsTotal;
    const net = billsTotal - discountAmount - discountValue;
    this.salesInvoiceForm.get('net')?.setValue(net);
  }

  calculateRest() {
    const net = this.salesInvoiceForm.get('net')?.value;
    const paidUp = this.salesInvoiceForm.get('paidUp')?.value || 0;
    const theRest = net - paidUp;
    this.salesInvoiceForm.get('theRest')?.setValue(theRest);
  }
}

export function positiveQuantity(control: AbstractControl) {
  const value = control.value;
  return value > 0 ? null : { invalidQuantity: true };
}
