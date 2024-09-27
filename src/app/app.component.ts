import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { ClientComponent } from './Components/client/client.component';
import { EmployeeComponent } from './Components/employee/employee.component';
import { UnitFormComponent } from './Components/unit-form/unit-form.component';
import { HomeComponent } from './Components/home/home.component';
import { SalesInvoiceComponent } from './Components/sales-invoice/sales-invoice.component';
import { ItemComponent } from './Components/item/item.component';
import { UnitsComponent } from './Components/units/units.component';
import { ItemsListComponent } from './Components/items-list/items-list.component';
import { EditItemComponent } from './Components/edit-item/edit-item.component';
import { LoginComponent } from './Components/login/login.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    ClientComponent,
    EmployeeComponent,
    HomeComponent,
    SalesInvoiceComponent,
    UnitsComponent,
    ItemComponent,
    ItemsListComponent,
    EditItemComponent,
    LoginComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  isLoginPage: boolean = false;
  title = 'task';
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.url === '/login';
      }
    });
  }
}
