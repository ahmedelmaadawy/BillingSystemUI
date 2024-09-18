import { routes } from './../../app.routes';
import { DataTransferService } from './../../Services/data-transfer.service';
import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../Services/client.service';
import { IClient } from '../../Models/IClient';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent implements OnInit {
  clients: IClient[] = [];
constructor(private clientService : ClientService,private data: DataTransferService,private router:Router) {
  
}
  ngOnInit(): void {
    this.GetClients();
    
  }

  GetClients() {
    this.clientService.GetClients().subscribe(
      {
        next:(response)=>{
          this.clients=response;
      }
      },
    );
  }
  
EditClient(client:any){
  this.data.SetClientObj(client);
  this.router.navigate(["/client"]);
};

  // Delete a client
  DeleteClient(clientId: number) {
    this.clientService.DeleteClient(clientId).subscribe({
      next: (response) => {
        this.GetClients();
               },
      error: (error) => {
        alert('Error adding client');
      }
    });
  }
  AddClient(){
    this.router.navigate(["/client"]);
  }
}

