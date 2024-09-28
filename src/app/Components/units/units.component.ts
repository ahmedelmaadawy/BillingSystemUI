import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { IUnit } from '../../Models/iunit';
import { UnitService } from '../../Services/unit.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
// import { EventEmitter } from 'stream';


@Component({
  selector: 'app-units',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule,RouterLink],
  templateUrl: './units.component.html',
  styleUrl: './units.component.css'
})
export class UnitsComponent implements OnInit {

constructor(private _unitService: UnitService){}

UnitList?:IUnit[]=[];

  ngOnInit(): void {
    this._unitService.getAllUnits().subscribe({
      next: (data: IUnit[]) => {
        this.UnitList = data;
      },
    });
  }

  deleteProductHandler(UnitId: number) {
    this._unitService.deleteUnit(UnitId).subscribe({
      next: () => {
        this.UnitList = this.UnitList?.filter(unit => unit.id !== UnitId);
          Swal.fire({
            title: 'Unit Deleted Successfully',
            icon: 'success',
            confirmButtonText: 'OK',
          });
      },
    });
  }



}

