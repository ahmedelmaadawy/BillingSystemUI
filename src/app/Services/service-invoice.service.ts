import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IInvoice } from '../Models/IInvoice';
import { IItemInvoice } from '../Models/IInvoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceServiceService {

  private baseUrl = 'https://localhost:44357/api/Invoice';

  constructor(private httpClient: HttpClient) { }

  getAllInvoices(): Observable<IInvoice[]> {
    return this.httpClient.get<IInvoice[]>(`${this.baseUrl}`);
  }

  getInvoiceById(id: number): Observable<IInvoice> {
    return this.httpClient.get<IInvoice>(`${this.baseUrl}/${id}`);
  }

  addInvoice(invoice: IInvoice): Observable<IInvoice> {
    return this.httpClient.post<IInvoice>(`${this.baseUrl}`, invoice);
  }

  editInvoice(id: number, invoice: IInvoice): Observable<IInvoice> {
    return this.httpClient.put<IInvoice>(`${this.baseUrl}/${id}`, invoice);
  }

  deleteInvoice(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }

  addItemToInvoice(itemInvoice: IItemInvoice): Observable<IItemInvoice> {
    return this.httpClient.post<IItemInvoice>(`${this.baseUrl}/item`, itemInvoice);
  }

  deleteItemFromInvoice(itemInvoiceId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/item/${itemInvoiceId}`);
  }
}
