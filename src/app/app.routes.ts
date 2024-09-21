import { Routes } from '@angular/router';
import { CompanyComponent } from './Components/company/company.component';
import { UnitsComponent } from './Components/units/units.component';
import { StorageReportComponent } from './Components/storage-report/storage-report.component';

import { SalesInvoiceComponent } from './Components/sales-invoice/sales-invoice.component';
import { HomeComponent } from './Components/home/home.component';

import { ClientComponent } from './Components/client/client.component';

import { EmployeeComponent } from './Components/employee/employee.component';
import { UnitFormComponent } from './Components/unit-form/unit-form.component';

import { TypesComponent } from './Components/types/types.component';
import { SalesreportComponent } from './Components/salesreport/salesreport.component';
import { ItemComponent } from './Components/item/item.component';
import { ClientListComponent } from './Components/client-list/client-list.component';

import { CompanylistComponent } from './Components/companylist/companylist.component';
import { TypesListComponent } from './Components/types-list/types-list.component';
import { ItemsListComponent } from './Components/items-list/items-list.component';
import { EditItemComponent } from './Components/edit-item/edit-item.component';
import { LoginComponent } from './Components/login/login.component';
export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'sales-invoice', component: SalesInvoiceComponent },
  { path: 'company/:id', component: CompanyComponent, title: 'Company' },
  {
    path: 'company-list',
    component: CompanylistComponent,
    title: 'List of Companies',
  },
  { path: 'unit/:id', component: UnitsComponent, title: 'Units' },
  { path: 'client', component: ClientComponent, title: 'Clients' },
  { path: 'employee', component: EmployeeComponent, title: 'Employees' },
  { path: 'types/:id', component: TypesComponent, title: 'Types' },
  { path: 'types-list', component: TypesListComponent, title: 'Types' },
  { path: 'items-list', component: ItemsListComponent, title: 'items' },
  { path: 'edit-unit/:id', component: UnitFormComponent, title: 'Unit' },
  { path: 'client-list', component: ClientListComponent, title: 'ClientList' },
  {
    path: 'salesreport',
    component: SalesreportComponent,
    title: 'Salesreport',
  },
  { path: 'editItem/:id',component:EditItemComponent,title:'edit Item'},
  { path: 'items', component: ItemComponent, title: 'Items' },
  { path: 'add-unit', component: UnitFormComponent, title: 'UnitForm' },
  {
    path: 'storage-report',
    component: StorageReportComponent,
    title: 'StorageReport',
  },
  { path: 'login', component: LoginComponent, title: 'Login' },
];
