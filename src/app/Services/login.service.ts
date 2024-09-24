import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  onLogin(obj: any): Observable<any>{
    return this.http.post(`https://localhost:44357/api/Authenation/login`,obj);
  }
}
