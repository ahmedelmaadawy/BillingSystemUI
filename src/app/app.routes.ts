import { Routes } from '@angular/router';
import { CompanyComponent } from '../Components/company/company.component';
import { UnitsComponent } from '../Components/units/units.component';
import { SalesreportComponent } from '../Components/salesreport/salesreport.component';
import { SidebarComponent } from '../Components/sidebar/sidebar.component';
import { StorageReportComponent } from '../Components/storage-report/storage-report.component';
export const routes: Routes = [
    {path:"company",component:CompanyComponent,title:"Company"},
    {path:"unit",component:UnitsComponent,title:"Units"},
    {path:"salesreport",component:SalesreportComponent,title:"Salesreport"},
    {path:"sidebar",component:SidebarComponent,title:"Sidebar"},
    {path:"storage-report",component:StorageReportComponent,title:"StorageReport"}
];
