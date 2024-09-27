import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IType } from '../Models/IType';

@Injectable({
  providedIn: 'root',
})
export class TypeService {
  constructor(private httpClient: HttpClient) {}
  getAllTypes(): Observable<IType[]> {
    return this.httpClient.get<IType[]>(`https://localhost:44357/api/Type`);
  }
  GetTypeById(id: number): Observable<IType> {
    return this.httpClient.get<IType>(`https://localhost:44357/api/Type/${id}`);
  }
  addType(type: IType): Observable<IType> {
    return this.httpClient.post<IType>(
      `https://localhost:44357/api/Type`,
      type
    );
  }
  editType(id: number, type: IType): Observable<any> {
    return this.httpClient.put<any>(
      `https://localhost:44357/api/type/${id}`,
      type
    );
  }
  deleteType(id: number) {
    return this.httpClient.delete<void>(
      `https://localhost:44357/api/type/${id}`
    );
  }
}
