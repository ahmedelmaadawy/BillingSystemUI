import { CompanyServiceService } from './../../Services/company-service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ICompany } from '../../Models/ICompany';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [FormsModule ,ReactiveFormsModule],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent implements OnInit {
  companies?: ICompany[];
constructor(private _companyService: CompanyServiceService) {

}
  ngOnInit(): void {
    this._companyService.getAllCompanies().subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err)=>{
        console.log(err)
      }
    });
  }

  CompanyForm:FormGroup=new FormGroup({
    name:new FormControl('',[Validators.required , Validators.minLength(3), Validators.maxLength(20) ]),
    details:new FormControl('',[Validators.required , Validators.minLength(3), Validators.maxLength(20) ]),

  })

  AddCompany(){
    alert("hello world")
  }
}
