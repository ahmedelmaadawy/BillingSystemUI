import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IItem } from '../Models/IItem';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private httpClient: HttpClient) {}
  getAllItems(): Observable<IItem[]> {
    return this.httpClient.get<IItem[]>(`${environment.baseUrl}/api/Item`);
  }
  getItemById(id: number): Observable<IItem> {
    return this.httpClient.get<IItem>(`${environment.baseUrl}/api/Item/${id}`);
  }
  addItem(item: IItem): Observable<IItem> {
    return this.httpClient.post<IItem>(`${environment.baseUrl}/api/Item`, item);
  }
  editItem(id: number, item: IItem): Observable<IItem> {
    return this.httpClient.put<IItem>(
      `${environment.baseUrl}/api/Item/${id}`,
      item
    );
  }
  deleteItem(id: number) {
    return this.httpClient.delete<void>(
      `${environment.baseUrl}/api/Item/${id}`
    );
  }
}
