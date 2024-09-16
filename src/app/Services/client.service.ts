import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IClient } from '../Models/IClient';

// client.module.ts (or the relevant module file)
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from '../Components/client/client.component';

@NgModule({
  imports: [CommonModule],
})
export class ClientModule {}

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = 'https://localhost:44357/api/Client'; // استبدل بالعنوان الصحيح للـ API

  constructor(private http: HttpClient) {}

  // Get all clients
  GetClients(): Observable<IClient[]> {
    return this.http.get<IClient[]>(this.apiUrl);
  }

  // Add a new client
  AddClient(client: IClient): Observable<IClient> {
    return this.http.post<IClient>(this.apiUrl, client);
  }

  // Update an existing client
  UpdateClient(id: number, client: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, client);
  }

  // Delete a client
  DeleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
