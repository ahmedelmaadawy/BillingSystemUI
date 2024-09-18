import { IClient } from './../Models/IClient';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  constructor() { }
  private clientobject=new BehaviorSubject<IClient|null>(null);
  SetClientObj(client:IClient|null){
    this.clientobject.next(client);
  }
  GetClientObj(){
    return this.clientobject.asObservable();
  }
}
