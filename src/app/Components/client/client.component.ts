import { ClientService } from './../../Services/client.service';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { response } from 'express';


@Component({
  selector: 'app-client',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {
constructor(private client:ClientService) {
  
  
}
clientForm:FormGroup=new FormGroup({
  name:new FormControl('',[Validators.required , Validators.minLength(3), Validators.maxLength(20) ]),
  address:new FormControl('',[Validators.required , Validators.minLength(3), Validators.maxLength(20) ]),
  phoneNumber:new FormControl('',[Validators.required,Validators.pattern(/^01[0152][0-9]{8}$/)])
  
})
AddClient(){
  this.client.AddClient(this.clientForm.value).subscribe({
    next:(response)=>{alert("Success")},
    error:(response)=>{alert("Error")}
  });
}
}
