import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IInvoice, IItemInvoice } from '../Models/IInvoice';

@Injectable({
  providedIn: 'root',
})
export class InvoiceServiceService {
  private apiUrl = 'https://localhost:7156/api/invoices';

  constructor(private http: HttpClient) {}

  // Post the invoice data to the backend
  postInvoice(invoice: IInvoice): Observable<any> {
    return this.http.post<any>(this.apiUrl, invoice);
  }
  // Get all invoices
  getAllInvoices(): Observable<IInvoice[]> {
    return this.http.get<IInvoice[]>(`${this.apiUrl}`);
  }

  // Get invoice by ID
  getInvoiceById(id: number): Observable<IInvoice> {
    return this.http.get<IInvoice>(`${this.apiUrl}/${id}`);
  }

  // Add a new invoice
  addInvoice(invoice: IInvoice): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, invoice);
  }

  // Edit an existing invoice by ID
  editInvoice(id: number, invoice: IInvoice): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, invoice);
  }

  // Delete an invoice by ID
  deleteInvoice(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Add an item to an invoice
  addItemToInvoice(itemInvoice: IItemInvoice): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/item`, itemInvoice);
  }

  // Delete an item from an invoice by item ID
  deleteItemFromInvoice(itemInvoiceId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/item/${itemInvoiceId}`);
  }
}
