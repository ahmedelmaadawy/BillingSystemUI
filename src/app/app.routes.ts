import { Routes } from '@angular/router';
import { CompanyComponent } from '../Components/company/company.component';
import { UnitsComponent } from '../Components/units/units.component';
import { TypesComponent } from '../Components/types/types.component';
import { SalesreportComponent } from'../Components/salesreport/salesreport.component';
export const routes: Routes = [
    {path:"company",component:CompanyComponent,title:"Company"},
    {path:"unit",component:UnitsComponent,title:"Units"},
    {path:"types",component:TypesComponent,title:"Types"},
    {path:"salesreport",component:SalesreportComponent,title:"Salesreport"}
];
