import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICompany } from '../Models/ICompany';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CompanyServiceService {

  constructor(private httpClient: HttpClient) { }

  getAllCompanies():Observable<ICompany[]> {
    return this.httpClient.get<ICompany[]>(`https://localhost:7156/api/Company`);
  }


  GetCompanyById(id: number): Observable<ICompany>{

    return this.httpClient.get<ICompany>(
      `https://localhost:7156/api/Company/${id}`
    );
   }
  addCompany(company: ICompany):Observable<ICompany> {
    return  this.httpClient.post<ICompany>(`https://localhost:7156/api/Company`,company);
   }
  editCompany(id:number,comForm:ICompany)
  {
    return this.httpClient.put<ICompany>(`https://localhost:7156/api/Company`,comForm);
  }
  deleteCompany(id: number) {
    return this.httpClient.delete<void>(`https://localhost:7156/api/Company/${id}`);
  }

}
