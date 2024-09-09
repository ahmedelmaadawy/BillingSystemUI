import { Routes } from '@angular/router';
import { CompanyComponent } from '../Components/company/company.component';
import { UnitsComponent } from '../Components/units/units.component';
import { ClientComponent } from '../Components/client/client.component';
import { EmployeeComponent } from '../Components/employee/employee.component';

export const routes: Routes = [
    {path:"company",component:CompanyComponent,title:"Company"},
    {path:"unit",component:UnitsComponent,title:"Units"},
    {path:"client",component:ClientComponent,title:"Clients"},
    {path:"employee",component:EmployeeComponent,title:"Employees"},
];
