import { Routes } from '@angular/router';
import { CompanyComponent } from '../Components/company/company.component';
import { UnitsComponent } from '../Components/units/units.component';

export const routes: Routes = [
    {path:"company",component:CompanyComponent,title:"Company"},
    {path:"unit",component:UnitsComponent,title:"Units"},
];
