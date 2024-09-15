import { Position } from './../../../node_modules/@types/estree/index.d';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http:HttpClient) { }
  AddClient(clientData:any){
    return  this.http.post("https://localhost:7156/api/Client",clientData);
  }
}
