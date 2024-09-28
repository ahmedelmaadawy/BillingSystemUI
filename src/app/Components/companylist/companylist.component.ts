import { ICompany } from './../../Models/ICompany';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CompanyServiceService } from '../../Services/company-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-companylist',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './companylist.component.html',
  styleUrl: './companylist.component.css',
})
export class CompanylistComponent implements OnInit {
  companies?: ICompany[];
  constructor(private _companyService: CompanyServiceService) {}
  ngOnInit(): void {
    this._companyService.getAllCompanies().subscribe({
      next: (response) => {
        this.companies = response;
      },
    });
  }
  deleteCompany(id: number) {
    this._companyService.deleteCompany(id).subscribe({
      next: (response) => {
        Swal.fire({
          title: 'Company Deleted Successfully',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        this.companies = this.companies?.filter((c) => c.id != id);
      },
    });
  }
}
