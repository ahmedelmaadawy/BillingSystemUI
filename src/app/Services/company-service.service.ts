import { ICompany } from './../Models/ICompany';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CompanyServiceService {
  constructor(private httpClient: HttpClient) {}

  getAllCompanies(): Observable<ICompany[]> {
    return this.httpClient.get<ICompany[]>(
      `${environment.baseUrl}/api/Company`
    );
  }

  GetCompanyById(id: number): Observable<ICompany> {
    return this.httpClient.get<ICompany>(
      `${environment.baseUrl}/api/Company/${id}`
    );
  }

  addCompany(company: ICompany): Observable<ICompany> {
    return this.httpClient.post<ICompany>(
      `${environment.baseUrl}/api/Company`,
      company
    );
  }
  editCompany(id: number, company: ICompany): Observable<any> {
    return this.httpClient.put<any>(
      `${environment.baseUrl}/api/Company/${id}`,
      company
    );
  }
  deleteCompany(id: number) {
    return this.httpClient.delete<void>(
      `${environment.baseUrl}/api/Company/${id}`
    );
  }
}
