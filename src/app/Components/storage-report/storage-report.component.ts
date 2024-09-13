import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-storage-report',
  templateUrl: './storage-report.component.html',
  styleUrls: ['./storage-report.component.css']
})
export class StorageReportComponent implements OnInit {
  storageReport = [
    { item: 'Item 1', quantity: 20, type: 'Type A', companyName: 'Company A', unit: 'Unit A', sellingPrice: 50 },
    { item: 'Item 2', quantity: 15, type: 'Type B', companyName: 'Company B', unit: 'Unit B', sellingPrice: 100 },
    // إضافة المزيد من العناصر حسب الحاجة
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
