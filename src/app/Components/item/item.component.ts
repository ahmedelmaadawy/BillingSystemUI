import { UnitService } from './../../Services/unit.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CompanyServiceService } from './../../Services/company-service.service';
import { ItemService } from './../../Services/item.service';
import { TypeService } from './../../Services/type.service';
import { ICompany } from './../../Models/ICompany';
import { IType } from './../../Models/IType';
import { IItem } from './../../Models/IItem';
import { CommonModule } from '@angular/common';
import { IUnit } from '../../Models/iunit';
import { error } from 'console';

@Component({
  selector: 'app-item',standalone: true,
  templateUrl: './item.component.html',
  imports:[ReactiveFormsModule,CommonModule,RouterLink,RouterLinkActive],
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  ItemForm: FormGroup;
  companies: ICompany[] = [];
  types: IType[] = [];
  units :IUnit[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private itemService: ItemService,
    private companyService: CompanyServiceService,
    private typeService: TypeService,
    private UnitService: UnitService
  ) {
    this.ItemForm = this.formBuilder.group({
      companyId: ['', Validators.required],
      typeId: ['', Validators.required],
      name: ['', Validators.required],
      availableQuantity: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      buyingPrice: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
      sellingPrice: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
      unitId: ['', Validators.required],
      notes: [''],

    });
  }

  ngOnInit(): void {
    this.loadCompanies();
    this.loadTypes();
    this.loadUnits();
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

  loadUnits():void{

    this.UnitService.getAllUnits().subscribe(
      (units:IUnit[]) => this.units=units  ,
      error => console.error('Error loading units',error)
    );
  }
  onSubmit(): void {
    if (this.ItemForm.valid) {
      // Map form values to the IItem structure
      const newItem: IItem = {
        ...this.ItemForm.value,
        companyId: +this.ItemForm.value.companyId,  // Ensure IDs are numbers
        typeId: +this.ItemForm.value.typeId,
        unitId: +this.ItemForm.value.unitId,
        availableQuantity: +this.ItemForm.value.availableQuantity,
        buyingPrice: +this.ItemForm.value.buyingPrice,
        sellingPrice: +this.ItemForm.value.sellingPrice
      };
      console.log('Saving item:', newItem);
      this.itemService.addItem(newItem).subscribe({
        next: () => {
          console.log('Item added successfully');
          this.router.navigate(['/items']);
          this.ItemForm.reset();  // Reset form after successful submission
        },
        error :(error)=> console.error('Error saving item:', error)
      });
    }
  }
}
