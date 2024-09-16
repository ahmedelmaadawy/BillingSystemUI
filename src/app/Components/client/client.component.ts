import { ClientService } from './../../Services/client.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { IClient } from '../../Models/IClient';


@Component({
  selector: 'app-client',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {

  clients: IClient[] = [];  // To store the list of clients
  clientId:number=0;
  isupdate:boolean=false;
  selectedClientId: number | null = null;  // To store client ID when updating

  constructor(private clientService: ClientService) {

  }
  clientForm:FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    address: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^01[0152][0-9]{8}$/)])
  });
  ngOnInit() {

    this.GetClients();
  }

  // Add a new client
  AddClient() {

      this.clientService.AddClient(this.clientForm.value).subscribe({
        next: (response) => {
          alert('Client added successfully');
          this.GetClients();
                 },
        error: (error) => {
          alert('Error adding client');
        }
      });

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
  this.clientId=client.id;
  this.isupdate=true;
  this.clientForm.patchValue({
    name: client.name,
    address: client.address,
    phoneNumber: client.phoneNumber
  });
};
Update(){
  this.clientService.UpdateClient(this.clientId,this.clientForm.value).subscribe({
    next:(response)=>{
      this.isupdate=false;
     this.GetClients();
    },
    error:(error)=>{
      console.log(error);

    }
  })


}
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

}

