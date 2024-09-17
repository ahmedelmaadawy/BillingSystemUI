import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive  } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IUnit } from '../../Models/iunit';
import { UnitService } from '../../Services/unit.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { response } from 'express';

@Component({
  selector: 'app-unit-form',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,FormsModule, ReactiveFormsModule,CommonModule ],
  templateUrl: './unit-form.component.html',
  styleUrl: './unit-form.component.css'
})
export class UnitFormComponent implements OnInit {

units?: IUnit[];
selectedUnit: any;
UnitId:number=0;

constructor(
  private _unitService: UnitService,
  private router: Router,
  private activatedRoute:ActivatedRoute){}
/**************************************************************************************** */

ngOnInit(): void {
  // Get the product ID from the route parameters
  this.UnitId = this.activatedRoute.snapshot.params['id']; // Convert string ID to number
  console.log(this.UnitId); // Log the ID to ensure it's correct

  if (this.UnitId > 0 ) {
    // Fetch the unit data by ID using the service
    this._unitService.GetUnitById(this.UnitId).subscribe({
      next: (unit: IUnit) => {
        this.selectedUnit = unit; // Assign the fetched unit to selectedUnit
        console.log(this.selectedUnit); // Log the unit data for debugging
        // Patch form with fetched data for editing
        this.UnitForm.patchValue({
          name: this.selectedUnit.name
        });
      },
      error: (err) => {
        console.error('Error fetching unit by ID', err); // Log the error if fetching fails
        alert("Error fetching unit");
      }
    });
  }
}

/***************************************************************************************** */
UnitForm: FormGroup=new FormGroup({
  name:new FormControl('',[
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20),
  ])
                                                                      // ,
                                                                      // UnitNotes: new FormControl('',[
                                                                      //   Validators.required,
                                                                      //     Validators.minLength(3),
                                                                      //     Validators.maxLength(400),
                                                                      // ])
});


AddUnit() {
  this._unitService.addUnit(this.UnitForm.value).subscribe({
    next: (response) => {
      Swal.fire({
        title: 'Saved Successfully',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        // After the user clicks 'OK', navigate to the home page
        this.router.navigateByUrl('/home');
      });
    },
    error: (err) => {
      console.log(this.UnitForm.value);
      console.log(err);
      Swal.fire({
        title: 'Error Please Enter a valid values',
        text: 'Unit name must be unique.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    },
  });
}

// AddUnit() {
//   this._unitService.addUnit(this.UnitForm.value).subscribe({
//     next: (response) => {
//       alert('Unit Saved Successfuly');
//       this.router.navigateByUrl('/home');
//     },
//     error: (err) => {
//       console.log(this.UnitForm.value);
//       console.log(err);
//       alert('Error');
//     },
//   });
// }

EditUnit() {
  this._unitService.editUnit(this.UnitId, this.UnitForm.value).subscribe({
    next: (response) => {
      Swal.fire({
        title: 'Unit Updated Successfully',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        // After the user clicks 'OK', navigate to the home page
        this.router.navigateByUrl('/home');
      });
    },
    error: (err) => {
      console.log(this.UnitForm.value);
      console.log(err);
      Swal.fire({
        title: 'Error Please Enter a valid values',
        text: 'Unit name must be unique.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    },
  });
}



}

