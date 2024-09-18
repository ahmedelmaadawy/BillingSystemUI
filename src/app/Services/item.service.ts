import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IItem } from '../Models/IItem';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private httpClient:HttpClient ) { }
  getAllItems(): Observable<IItem[]>
  {
    return this.httpClient.get<IItem[]>(`https://localhost:7156/api/Item`);
  }
  getItemById(id :number):Observable<IItem>
  {
    return this.httpClient.get<IItem>(`https://localhost:7156/api/Item/${id}`);
  }
  addItem(item : IItem):Observable<IItem>
  {
    return this.httpClient.post<IItem>(`https://localhost:7156/api/Item`,item);
  }
  editItem(id:number,item:IItem):Observable<IItem>
  {
    return this.httpClient.put<IItem>(`https://localhost:7156/api/Item/${id}`,item);
  }
  deleteItem(id :number)
  {
    return this.httpClient.delete<void>(`https://localhost:7156/api/Item/${id}`);
  }
}
