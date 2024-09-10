import { Routes } from '@angular/router';
import { CompanyComponent } from '../Components/company/company.component';
import { UnitsComponent } from '../Components/units/units.component';
import { SalesInvoiceComponent } from '../Components/sales-invoice/sales-invoice.component';
import { HomeComponent } from '../Components/home/home.component';

import { ClientComponent } from '../Components/client/client.component';
import { EmployeeComponent } from '../Components/employee/employee.component';
import { UnitFormComponent } from '../Components/unit-form/unit-form.component';

import { TypesComponent } from '../Components/types/types.component';
import { SalesreportComponent } from '../Components/salesreport/salesreport.component';
export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'sales-invoice', component: SalesInvoiceComponent },
  { path: 'company', component: CompanyComponent, title: 'Company' },
  { path: 'unit', component: UnitsComponent, title: 'Units' },
  { path: 'client', component: ClientComponent, title: 'Clients' },
  { path: 'employee', component: EmployeeComponent, title: 'Employees' },
  { path: 'types', component: TypesComponent, title: 'Types' },
  {
    path: 'salesreport',
    component: SalesreportComponent,
    title: 'Salesreport',
  },
  { path: 'unit-form', component: UnitFormComponent, title: 'UnitForm' },
];
