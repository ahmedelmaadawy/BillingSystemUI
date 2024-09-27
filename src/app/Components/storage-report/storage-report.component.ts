import { IItem } from './../../Models/IItem';
import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../../Services/item.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-storage-report',
  imports:[CommonModule],
  standalone:true,
  templateUrl: './storage-report.component.html',
  styleUrls: ['./storage-report.component.css']
})
export class StorageReportComponent implements OnInit {


  storageReport :any=[];

  constructor( private router: Router, private itemService: ItemService)
  {

  }

  ngOnInit(): void {
    this.itemService.getAllItems().subscribe({
      next: (response) => {
        this.storageReport = response.filter((r)=>r.availableQyantity >0);
        console.log(this.storageReport);
      },
      error: (err) => {
        console.log(err);
      },
    });

  }
}
