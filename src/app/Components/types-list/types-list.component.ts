import { Component, OnInit } from '@angular/core';
import { IType } from '../../Models/IType';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TypeService } from '../../Services/type.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-types-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './types-list.component.html',
  styleUrl: './types-list.component.css',
})
export class TypesListComponent implements OnInit {
  types?: IType[];
  constructor(private _typeService: TypeService) {}
  ngOnInit(): void {
    this._typeService.getAllTypes().subscribe({
      next: (response) => {
        this.types = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  deleteType(id: number) {
    this._typeService.deleteType(id).subscribe({
      next: (response) => {
        Swal.fire({
          title: 'Deleted Successfully',
          text: 'Do you want to continue',
          icon: 'success',
          confirmButtonText: 'OK',
        });
       this.types =  this.types?.filter((t) => t.id != id);
      },
      error: (err) => {
        Swal.fire({
          title: 'Something went wrong',
          text: 'Check Your Internet connection',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      },
    });
  }
}
