import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [FormsModule ,ReactiveFormsModule],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent {



  CompanyForm:FormGroup=new FormGroup({
    name:new FormControl('',[Validators.required , Validators.minLength(3), Validators.maxLength(20) ]),
    details:new FormControl('',[Validators.required , Validators.minLength(3), Validators.maxLength(20) ]),

  })

  AddCompany(){
    alert("hello world")
  }
}
