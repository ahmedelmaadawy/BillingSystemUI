import { Routes } from '@angular/router';
import { SalesInvoiceComponent } from '../Components/sales-invoice/sales-invoice.component';
import { HomeComponent } from '../Components/home/home.component';


export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'sales-invoice', component: SalesInvoiceComponent },
];
