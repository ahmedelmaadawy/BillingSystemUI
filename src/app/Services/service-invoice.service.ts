import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IInvoice } from '../Models/IInvoice';
import { IInvoiceDetails } from '../Models/IInvoiceDetails';

@Injectable({
  providedIn: 'root',
})
export class InvoiceServiceService {
  private apiUrl = 'https://localhost:7156/api/invoice';

  constructor(private http: HttpClient) {}

  // Post the invoice data to the backend
  postInvoice(invoice: IInvoice): Observable<IInvoice> {
    return this.http.post<IInvoice>(this.apiUrl, invoice);
  }

  // Get all invoices
  getAllInvoices(): Observable<IInvoice[]> {
    return this.http.get<IInvoice[]>(`${this.apiUrl}`);
  }

  // Get invoice by ID
  getInvoiceById(id: number): Observable<IInvoiceDetails> {
    return this.http.get<IInvoiceDetails>(`${this.apiUrl}/${id}`);
  }

  // Edit an existing invoice by ID
  editInvoice(id: number, invoice: IInvoice): Observable<IInvoice> {
    return this.http.put<IInvoice>(`${this.apiUrl}/${id}`, invoice);
  }

  // Delete an invoice by ID
  deleteInvoice(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
