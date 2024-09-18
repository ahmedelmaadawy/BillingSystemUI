import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { IUnit } from '../../Models/iunit';
import { UnitService } from '../../Services/unit.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
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
      error: (err) => {
        console.error('Error fetching units', err);
        alert("ERROR");
      },
      complete: () => {
        console.log('Unit fetching complete');
      }
    });
  }

  deleteProductHandler(UnitId: number) {
    this._unitService.deleteUnit(UnitId).subscribe({
      next: () => {
        // Remove the deleted unit from the local UnitList array
        this.UnitList = this.UnitList?.filter(unit => unit.id !== UnitId);
        alert('Unit deleted successfully');
      },
      error: (err) => {
        console.error('Error deleting unit:', err);
        alert('Error deleting unit');
      }
    });
  }



}

