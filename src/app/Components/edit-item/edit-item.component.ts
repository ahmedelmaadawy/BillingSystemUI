import { UnitService } from './../../Services/unit.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyServiceService } from './../../Services/company-service.service';
import { ItemService } from './../../Services/item.service';
import { TypeService } from './../../Services/type.service';
import { ICompany } from './../../Models/ICompany';
import { IType } from './../../Models/IType';
import { IItem } from './../../Models/IItem';
import { IUnit } from '../../Models/iunit';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-item',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css'],
})
export class EditItemComponent implements OnInit {
  ItemForm: FormGroup;
  companies: ICompany[] = [];
  types: IType[] = [];
  units: IUnit[] = [];
  selectedItemId: number = 0;
  selectedItem!: IItem;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private itemService: ItemService,
    private companyService: CompanyServiceService,
    private typeService: TypeService,
    private unitService: UnitService,
    private route: ActivatedRoute
  ) {
    this.ItemForm = this.formBuilder.group({
      companyId: ['', Validators.required],
      typeId: ['', Validators.required],
      name: ['', Validators.required],
      availableQuantity: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+$')],
      ],
      buyingPrice: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')],
      ],
      sellingPrice: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')],
      ],
      unitId: ['', Validators.required],
      notes: [''],
    });
  }

  ngOnInit(): void {
    this.companyService.getAllCompanies().subscribe(
      (companies: ICompany[]) => (this.companies = companies),
      (error) => console.error('Error loading companies:', error)
    );
    this.typeService.getAllTypes().subscribe(
      (types: IType[]) => (this.types = types),
      (error) => console.error('Error loading types:', error)
    );
    this.unitService.getAllUnits().subscribe(
      (units: IUnit[]) => (this.units = units),
      (error) => console.error('Error loading units:', error)
    );
    // Get the ID from route params
    this.route.params.subscribe((params) => {
      this.selectedItemId = Number(params['id']);
      this.getItemByID(this.selectedItemId); // Fetch the item by ID
      console.log(this.selectedItemId);
    });
  }

  getItemByID(id: number): void {
    this.itemService.getItemById(id).subscribe({
      next: (response) => {
        this.selectedItem = response;
        console.log(this.selectedItem);
        this.patchFormWithSelectedItem(); // Patch the form with the selected item
      },
      error: (error) => console.error('Error loading item:', error),
    });
  }

  patchFormWithSelectedItem(): void {
    let companyId = this.companies.filter(
      (c) => c.name == this.selectedItem.company
    )[0].id;
    let typeId = this.types.filter((t) => t.name == this.selectedItem.type)[0]
      .id;
    let unitId = this.units.filter((u) => u.name == this.selectedItem.unit)[0]
      .id;
    this.ItemForm.patchValue({
      companyId: companyId,
      typeId: typeId,
      name: this.selectedItem.name,
      availableQuantity: this.selectedItem.availableQyantity,
      buyingPrice: this.selectedItem.buyingPrice,
      sellingPrice: this.selectedItem.sellingPrice,
      unitId: unitId,
      notes: this.selectedItem.note,
    });
    console.log(this.ItemForm.value);
  }

  onSubmit(): void {
    if (this.ItemForm.valid) {
      const updatedItem: IItem = {
        ...this.ItemForm.value,
        companyId: +this.ItemForm.value.companyId, // Ensure IDs are numbers
        typeId: +this.ItemForm.value.typeId,
        unitId: +this.ItemForm.value.unitId,
        availableQuantity: +this.ItemForm.value.availableQuantity,
        buyingPrice: +this.ItemForm.value.buyingPrice,
        sellingPrice: +this.ItemForm.value.sellingPrice,
      };

      console.log('Saving item:', updatedItem);
      this.itemService.editItem(this.selectedItemId, updatedItem).subscribe(
        () => {
          console.log('Item updated successfully');
          this.router.navigate(['/items']); // Navigate back to item list
          this.ItemForm.reset();
        },
        (error) => console.error('Error updating item:', error)
      );
    }
  }
}
