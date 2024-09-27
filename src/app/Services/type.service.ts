import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IType } from '../Models/IType';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TypeService {
  constructor(private httpClient: HttpClient) {}
  getAllTypes(): Observable<IType[]> {
    return this.httpClient.get<IType[]>(`${environment.baseUrl}/api/Type`);
  }
  GetTypeById(id: number): Observable<IType> {
    return this.httpClient.get<IType>(`${environment.baseUrl}/api/Type/${id}`);
  }
  addType(type: IType): Observable<IType> {
    return this.httpClient.post<IType>(`${environment.baseUrl}/api/Type`, type);
  }
  editType(id: number, type: IType): Observable<any> {
    return this.httpClient.put<any>(
      `${environment.baseUrl}/api/type/${id}`,
      type
    );
  }
  deleteType(id: number) {
    return this.httpClient.delete<void>(
      `${environment.baseUrl}/api/type/${id}`
    );
  }
}
