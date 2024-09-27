import { ICompany } from './../Models/ICompany';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyServiceService {

  constructor(private httpClient: HttpClient) { }

  getAllCompanies():Observable<ICompany[]> {
    return this.httpClient.get<ICompany[]>(
      `https://localhost:7156/api/Company`
    );
  }


  GetCompanyById(id: number): Observable<ICompany>{
    return this.httpClient.get<ICompany>(
      `https://localhost:7156/api/Company/${id}`
    );
  }

  addCompany(company: ICompany):Observable<ICompany> {
    return this.httpClient.post<ICompany>(
      `https://localhost:7156/api/Company`,
      company
    );
   }
  editCompany(id: number, company :ICompany):Observable<any>{

    return this.httpClient.put<any>(
      `https://localhost:7156/api/Company/${id}`,
      company
    );
  }
  deleteCompany(id: number) {
    return this.httpClient.delete<void>(
      `https://localhost:7156/api/Company/${id}`
    );

  }

}
