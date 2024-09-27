import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUnit } from '../Models/iunit';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  constructor(private httpClient: HttpClient) {}

  getAllUnits(): Observable<IUnit[]> {
    return this.httpClient.get<IUnit[]>(`${environment.baseUrl}/api/Unit`); //*******//
  }

  GetUnitById(id: number): Observable<IUnit> {
    return this.httpClient.get<IUnit>(`${environment.baseUrl}/api/Unit/${id}`);
  }

  addUnit(unit: IUnit): Observable<IUnit> {
    return this.httpClient.post<IUnit>(`${environment.baseUrl}/api/Unit`, unit);
  }

  deleteUnit(id: number) {
    return this.httpClient.delete<void>(
      `${environment.baseUrl}/api/Unit/${id}`
    );
  }

  editUnit(id: number, unit: IUnit) {
    return this.httpClient.put<IUnit>(
      `${environment.baseUrl}/api/Unit/${id}`,
      unit
    );
  }
}
