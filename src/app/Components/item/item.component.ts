import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyServiceService } from './../../Services/company-service.service';
import { ItemService } from './../../Services/item.service';
import { TypeService } from './../../Services/type.service';
import { ICompany } from './../../Models/ICompany';
import { IType } from './../../Models/IType';
import { IItem } from './../../Models/IItem';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item',standalone: true,
  templateUrl: './item.component.html',
  imports:[ReactiveFormsModule,CommonModule],
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  ItemForm: FormGroup;
  companies: ICompany[] = [];
  types: IType[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private itemService: ItemService,
    private companyService: CompanyServiceService,
    private typeService: TypeService
  ) {
    this.ItemForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      typeName: ['', Validators.required],
      name: ['', Validators.required],
      availableQuantity: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      buyingPrice: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
      sellingPrice: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
      unit: ['', Validators.required],
      notes: [''],
      unitName:['',Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCompanies();
    this.loadTypes();
  }

  loadCompanies(): void {
    this.companyService.getAllCompanies().subscribe(
      (companies: ICompany[]) => this.companies = companies,
      error => console.error('Error loading companies:', error)
    );
  }

  loadTypes(): void {
    this.typeService.getAllTypes().subscribe(
      (types: IType[]) => this.types = types,
      error => console.error('Error loading types:', error)
    );
  }

  onSubmit(): void {
    if (this.ItemForm.valid) {
      const newItem: IItem = this.ItemForm.value;
      this.itemService.addItem(newItem).subscribe(
        () => this.router.navigate(['/items']),
        error => console.error('Error saving item:', error)
      );
    }
  }
}
