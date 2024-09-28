import { response } from 'express';
import { ItemService } from './../../Services/item.service';
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
import { IInvoice } from '../../Models/IInvoice';
import { IClient } from '../../Models/IClient';
import { ClientService } from '../../Services/client.service';
import { IItem } from '../../Models/IItem';
import Swal from 'sweetalert2';
import { catchError, map, Observable, of } from 'rxjs';

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
  net: number = 0;
  billsNumber: number = 0;
  total: number = 0;

  addedItems: Array<{
    itemName: string;
    itemId: number;
    invoiceId: number;
    quantity: number;
    total: number;
    sellingPrice: number;
  }> = [];
  clients: IClient[] = [];
  items: IItem[] = [];

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceServiceService,
    private _clientService: ClientService,
    private _itemService: ItemService
  ) {
    this.salesInvoiceForm = this.fb.group({
      billDate: [{ value: '', disabled: false }, Validators.required],
      billNumber: [{ value: '', disabled: true }, Validators.required],
      clientId: ['', Validators.required],
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
    let randomBillNumber = 1;
    this.invoiceService.getAllInvoices().subscribe({
      next: (response) => {
        randomBillNumber = response.length;
        this.billsNumber = response.length;
        this.salesInvoiceForm.get('billNumber')?.setValue(randomBillNumber + 1);
      },
    });
  }

  calculateTotal() {
    const quantity = this.itemForm.get('quantity')?.value || 0;
    const sellingPrice = this.itemForm.get('sellingPrice')?.value || 0;
    const total = quantity * sellingPrice;
    this.itemForm.get('total')?.setValue(total);
  }

  addItem() {
    const item = {
      itemId: this.itemForm.get('item')?.value,
      invoiceId: 0,
      itemName: this.items.filter(
        (i) => i.id == this.itemForm.get('item')?.value
      )[0].name,
      quantity: this.itemForm.get('quantity')?.value,
      total: this.itemForm.get('total')?.value,
      sellingPrice: this.itemForm.get('sellingPrice')?.value,
    };
    let selectedItem = this.items.filter((i) => i.id == item.itemId)[0];
    if (item.quantity > selectedItem.availableQyantity) {
      Swal.fire({
        title: `Error`,
        text:`You exceeded the available quantity for the item ${item.itemName} the available quantity is ${selectedItem.availableQyantity}`,
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } else {
      this.addedItems.push(item);
      this.itemForm.reset();
      this.calculateBillsTotal();
    }
  }

  onItemSelected() {
    const selectedItemId = this.itemForm.get('item')?.value;
    if (selectedItemId) {
      const selectedItem = this.items.find(
        (item) => item.id === +selectedItemId
      );
      if (selectedItem) {
        this.itemForm.get('sellingPrice')?.setValue(selectedItem.sellingPrice);
      }
    }
  }

  submitForm() {
    if (this.salesInvoiceForm.valid) {
      const invoice: IInvoice = {
        net: this.net,
        billNumber: this.billsNumber,
        billsTotal: this.total,
        ...this.salesInvoiceForm.value,
        employeeId: 1,
        itemInvoices: this.addedItems.map((item) => ({
          itemId: item.itemId,
          invoiceId: 0,
          quantity: item.quantity,
          total: item.total,
          sellingPrice: item.sellingPrice,
        })),
      };
      this.invoiceService.postInvoice(invoice).subscribe({
        next: (response) => {
          Swal.fire({
            title: 'Invoice Saved Successfully',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          this.salesInvoiceForm.reset();
          this.addedItems = [];
          this.generateBillNumber();
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      Swal.fire({
        title: 'Invalid values',
        icon: 'error',
        text: `${this.salesInvoiceForm.errors}`,
        confirmButtonText: 'OK',
      });
    }
  }

  calculateBillsTotal() {
    const total = this.addedItems.reduce((acc, item) => acc + item.total, 0);
    this.total = total;
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
    this.net = net;
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
