import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUnit } from '../Models/iunit';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor(private httpClient:HttpClient) { }

  getAllUnits():Observable<IUnit[]>{
    return this.httpClient.get<IUnit[]>(`https://localhost:44357/api/Unit`);//*******//
  }

  GetUnitById(id: number): Observable<IUnit>{

    return this.httpClient.get<IUnit>(`https://localhost:44357/api/Unit/${id}`);
  }

  addUnit(unit: IUnit):Observable<IUnit> {
    return this.httpClient.post<IUnit>(
      `https://localhost:44357/api/Unit`,
      unit
    );
  }

  deleteUnit(id: number) {
    return this.httpClient.delete<void>(
      `https://localhost:44357/api/Unit/${id}`
    );
  }

  editUnit(id:number,unit:IUnit) {
    return this.httpClient.put<IUnit>(
      `https://localhost:44357/api/Unit/${id}`,
      unit
    );
  }

}
