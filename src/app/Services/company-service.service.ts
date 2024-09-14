import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICompany } from '../Models/ICompany';

@Injectable({
  providedIn: 'root'
})
export class CompanyServiceService {

  constructor(private httpClient: HttpClient) { }

  getAllCompanies():Observable<ICompany[]> {
    return this.httpClient.get<ICompany[]>(`https://localhost:44357/api/Company`);
  }


  GetCompanyById(id: number): Observable<ICompany>{

    return this.httpClient.get<ICompany>(
      `https://localhost:44357/api/Company/${id}`
    );
   }
  addCompany(company: ICompany):Observable<ICompany> {
    return  this.httpClient.post<ICompany>(`https://localhost:44357/api/Company`,company);
   }
  editCompany() { }
  deleteCompany(id: number) {
    return this.httpClient.delete<void>(`https://localhost:44357/api/Company/${id}`);
  }

}
