import { response } from 'express';
import { ClientService } from './../../Services/client.service';
import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { IClient } from '../../Models/IClient';
import { DataTransferService } from '../../Services/data-transfer.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-client',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
})
export class ClientComponent implements OnInit {
  clients: IClient[] = []; // To store the list of clients
  clientId: number = 0;
  isupdate: boolean = false;
  selectedClientId: number | null = null; // To store client ID when updating

  constructor(
    private clientService: ClientService,
    private data: DataTransferService,
    private reouter: Router
  ) {}
  isclient: IClient | null = null;
  clientForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^01[0152][0-9]{8}$/),
    ]),
    number: new FormControl(''),
  });
  ngOnInit() {
    this.data.GetClientObj().subscribe({
      next: (response) => {
        if (response == null) {
          this.isclient = null;
          this.clientService.GetClients().subscribe({
            next: (response) => {
              this.clientForm.patchValue({
                number: response?.length+1 || 1,
              });
            },
          });
        } else {
          this.isupdate = true;
          this.clientId = response.id;

          this.clientForm.patchValue({
            name: response?.name,
            address: response?.address,
            phoneNumber: response?.phoneNumber,
            number: response?.number,
          });
        }
      },
    });
  }

  // Add a new client
  AddClient() {
    this.clientService.AddClient(this.clientForm.value).subscribe({
      next: (response) => {
        Swal.fire({
          title: 'Client Saved Successfully',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        this.reouter.navigate(['/client-list']);
      },
    });
  }
  Update() {
    this.clientService
      .UpdateClient(this.clientId, this.clientForm.value)
      .subscribe({
        next: (response) => {
          this.isupdate = false;
          this.reouter.navigate(['/client-list']);
          this.data.SetClientObj(null);
        },
      });
  }
  ShowList() {
    this.reouter.navigate(['/client-list']);
  }
}
